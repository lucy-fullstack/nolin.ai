import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 42,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ 
            width: 64, 
            height: 64, 
            borderRadius: 12, 
            background: '#0CCE6B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 32,
            fontWeight: 'bold',
            marginRight: 16
          }}>
            N
          </div>
          <div style={{ 
            fontWeight: 'bold', 
            fontSize: 48,
            marginLeft: 8
          }}>
            nolin.ai
          </div>
        </div>
        <div style={{ fontSize: 24, color: '#666', textAlign: 'center', maxWidth: '80%' }}>
          Schedule Social Media Content from Notion
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
} 