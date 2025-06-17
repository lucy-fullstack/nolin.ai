interface WaitlistFormData {
  email: string;
  name: string;
  company?: string;
  role?: string;
  newsletter: boolean;
  website?: string; // Honeypot field
}

/**
 * Submits a form to the waitlist API
 */
export async function submitWaitlistForm(data: WaitlistFormData) {
  console.log('Submitting waitlist form:', data);
  
  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add CSRF protection token
        'X-CSRF-Protection': '1',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log('Waitlist API response:', { status: response.status, result });

    if (!response.ok) {
      console.error('Waitlist submission failed:', result.error);
      return {
        success: false,
        error: result.error || `Failed with status ${response.status}. Please try again.`,
      };
    }

    console.log('Waitlist submission successful');
    return { success: true, data: result.data };
  } catch (error) {
    console.error('Error submitting waitlist form:', error);
    return {
      success: false,
      error: error instanceof Error ? 
        `Network error: ${error.message}` : 
        'An unexpected error occurred. Please try again.',
    };
  }
} 