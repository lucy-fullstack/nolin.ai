import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const imageResponse = new ImageResponse(
      (
        <span>
          N
        </span>
      ),
      {
        width: 180,
        height: 180,
      }
    )

    return imageResponse
  } catch (error) {
    return new Response('Failed to generate icon', { status: 500 })
  }
} 