import { DateTime } from 'luxon'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

const commonTimezones = [
  { zone: 'America/New_York', label: 'New York', flag: 'us' },
  { zone: 'America/Los_Angeles', label: 'Los Angeles', flag: 'us' },
  { zone: 'Europe/London', label: 'London', flag: 'gb' },
  { zone: 'Europe/Paris', label: 'Paris', flag: 'fr' },
  { zone: 'Asia/Tokyo', label: 'Tokyo', flag: 'jp' },
  { zone: 'Asia/Dubai', label: 'Dubai', flag: 'ae' },
  { zone: 'Australia/Sydney', label: 'Sydney', flag: 'au' },
  { zone: 'Asia/Kolkata', label: 'New Delhi', flag: 'in' },
]

export default async function GET({ params }: { params: Promise<{ dt: string | undefined }> }) {
  try {
    const { dt } = await params

    if (!dt) {
      return new ImageResponse(
        (
          <div
            style={{
              background: '#ffffff',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 'bold',
                color: '#3b82f6',
              }}
            >
              zonr.dev
            </div>
            <div
              style={{
                fontSize: 36,
                color: '#4b5563',
                marginTop: '20px',
              }}
            >
              Share your time across timezones
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      )
    }

    const dtObj = DateTime.fromISO(decodeURIComponent(dt))

    return new ImageResponse(
      (
        <div
          style={{
            background: '#ffffff',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                gap: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '49%',
                  gap: '16px',
                }}
              >
                {commonTimezones.slice(0, 4).map((tz) => (
                  <div
                    key={tz.zone}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      fontSize: 32,
                      color: '#4b5563',
                      padding: '16px',
                      background: '#f3f4f6',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        color: '#1f2937',
                        marginBottom: '8px',
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://flagcdn.com/24x18/${tz.flag}.png`}
                        alt={tz.label}
                        style={{
                          height: '24px',
                          marginRight: '8px',
                        }}
                      />
                      {tz.label}
                    </div>
                    <div>{dtObj.setZone(tz.zone).toFormat('ff ZZZZ')}</div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '49%',
                  gap: '16px',
                }}
              >
                {commonTimezones.slice(4).map((tz) => (
                  <div
                    key={tz.zone}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      fontSize: 32,
                      color: '#4b5563',
                      padding: '16px',
                      background: '#f3f4f6',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        color: '#1f2937',
                        marginBottom: '8px',
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://flagcdn.com/24x18/${tz.flag}.png`}
                        alt={tz.label}
                        style={{
                          height: '24px',
                          marginRight: '8px',
                        }}
                      />
                      {tz.label}
                    </div>
                    <div>{dtObj.setZone(tz.zone).toFormat('ff ZZZZ')}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '20px',
              fontSize: 28,
              fontWeight: 'bold',
              color: '#3b82f6',
            }}
          >
            zonr.dev
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e) {
    console.error(e)
    return new Response('Failed to generate image', { status: 500 })
  }
}
