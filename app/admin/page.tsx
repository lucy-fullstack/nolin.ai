"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { submitWaitlistForm } from "@/utils/api"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle } from "lucide-react"

interface WaitlistEntry {
  id: string
  email: string
  name: string
  company: string | null
  role: string | null
  newsletter: boolean
  created_at: string
}

export default function AdminPage() {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Test form state
  const [testFormData, setTestFormData] = useState({
    email: `test${Math.floor(Math.random() * 10000)}@example.com`,
    name: "Test User",
    company: "Test Company",
    role: "content-creator",
    newsletter: true
  })
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null)
  const [testLoading, setTestLoading] = useState(false)

  async function fetchWaitlist() {
    setLoading(true)
    setError(null)
    
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        throw error
      }
      
      setWaitlist(data || [])
    } catch (err: any) {
      console.error("Error fetching waitlist:", err)
      setError(err.message || "Failed to fetch waitlist data")
    } finally {
      setLoading(false)
    }
  }

  async function handleTestSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTestLoading(true)
    setTestResult(null)
    
    try {
      const result = await submitWaitlistForm(testFormData)
      
      setTestResult({
        success: result.success,
        message: result.success 
          ? "Successfully submitted to waitlist! Check the database." 
          : `Error: ${result.error}`
      })
      
      if (result.success) {
        // Refresh the waitlist data
        await fetchWaitlist()
      }
    } catch (err) {
      setTestResult({
        success: false,
        message: `Unexpected error: ${err instanceof Error ? err.message : String(err)}`
      })
    } finally {
      setTestLoading(false)
    }
  }

  const handleTestInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTestFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTestCheckboxChange = (checked: boolean) => {
    setTestFormData(prev => ({ ...prev, newsletter: checked }))
  }

  const handleTestRoleChange = (value: string) => {
    setTestFormData(prev => ({ ...prev, role: value }))
  }

  useEffect(() => {
    fetchWaitlist()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="container py-10">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Waitlist Administration</CardTitle>
          <CardDescription>
            Manage and view all waitlist submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <Label className="text-lg">{waitlist.length} Total Entries</Label>
            </div>
            <Button 
              onClick={fetchWaitlist} 
              disabled={loading}
            >
              Refresh Data
            </Button>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-4">
              <p><strong>Error:</strong> {error}</p>
              <p className="text-sm mt-2">
                Make sure you have created a 'waitlist' table in your Supabase database with the 
                following columns: id, email, name, company, role, newsletter, created_at
              </p>
            </div>
          )}

          {loading ? (
            <div className="text-center py-4">Loading waitlist data...</div>
          ) : waitlist.length === 0 ? (
            <div className="text-center py-4">No waitlist entries found.</div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableCaption>All waitlist submissions</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Newsletter</TableHead>
                    <TableHead>Submitted At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {waitlist.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.email}</TableCell>
                      <TableCell>{entry.name}</TableCell>
                      <TableCell>{entry.company || '—'}</TableCell>
                      <TableCell>{entry.role || '—'}</TableCell>
                      <TableCell>{entry.newsletter ? 'Yes' : 'No'}</TableCell>
                      <TableCell>{formatDate(entry.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Test API Connection</CardTitle>
          <CardDescription>
            Test the waitlist API endpoint connection to Supabase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTestSubmit} className="space-y-4">
            {testResult && (
              <Alert variant={testResult.success ? "default" : "destructive"}>
                {testResult.success ? (
                  <CheckCircle className="h-4 w-4 mr-2" />
                ) : (
                  <XCircle className="h-4 w-4 mr-2" />
                )}
                <AlertDescription>{testResult.message}</AlertDescription>
              </Alert>
            )}
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="test-email">Email</Label>
                <Input
                  id="test-email"
                  name="email"
                  type="email"
                  value={testFormData.email}
                  onChange={handleTestInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="test-name">Name</Label>
                <Input
                  id="test-name"
                  name="name"
                  value={testFormData.name}
                  onChange={handleTestInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="test-company">Company</Label>
                <Input
                  id="test-company"
                  name="company"
                  value={testFormData.company}
                  onChange={handleTestInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="test-role">Role</Label>
                <Select 
                  value={testFormData.role} 
                  onValueChange={handleTestRoleChange}
                >
                  <SelectTrigger id="test-role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="content-creator">Content Creator</SelectItem>
                    <SelectItem value="ghostwriter">Ghostwriter</SelectItem>
                    <SelectItem value="community-manager">Community Manager</SelectItem>
                    <SelectItem value="agency-owner">Agency Owner</SelectItem>
                    <SelectItem value="marketing-manager">Marketing Manager</SelectItem>
                    <SelectItem value="other">Another role</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="test-newsletter" 
                checked={testFormData.newsletter}
                onCheckedChange={handleTestCheckboxChange}
              />
              <Label htmlFor="test-newsletter">Subscribe to newsletter</Label>
            </div>
            
            <Button type="submit" disabled={testLoading}>
              {testLoading ? "Testing..." : "Test Submission"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supabase Setup Guide</CardTitle>
          <CardDescription>Follow these steps to set up your Supabase waitlist table</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            <li>Go to your Supabase dashboard: <a href="https://app.supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">https://app.supabase.com</a></li>
            <li>Open your project and navigate to the SQL Editor</li>
            <li>Create the waitlist table by running the following SQL:</li>
          </ol>

          <pre className="bg-muted p-4 rounded-md my-4 overflow-x-auto text-sm">
{`CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  company TEXT,
  role TEXT,
  newsletter BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX waitlist_email_idx ON waitlist(email);`}
          </pre>
          
          <p className="mt-4">After creating the table, refresh this page to see your waitlist entries.</p>
        </CardContent>
      </Card>
    </div>
  )
} 