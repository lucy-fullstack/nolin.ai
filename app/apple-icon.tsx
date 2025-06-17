import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#DC5427',
          borderRadius: '32px',
          padding: '24px'
        }}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%' }}
        >
          <rect width="24" height="24" rx="6" fill="#FFFFFF" opacity="0.9" />
          <path 
            d="M18.4 5.5h-3.8v13h2.6v-8.32h1.2V5.5Z" 
            fill="#0B0A1F" 
          />
          <path 
            d="M9.4 5.5H5.6v13h2.6v-8.32h1.2V5.5Z" 
            fill="#0B0A1F" 
          />
          <path 
            d="M13.8 9.5v9h-3.6v-9h3.6Z" 
            fill="#0B0A1F" 
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
} 