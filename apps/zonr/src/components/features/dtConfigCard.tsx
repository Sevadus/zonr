'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DateTimePicker } from '@/components/ui/date-time-picker'
import { Input } from '@/components/ui/input'
import { shortenUrl } from '@/lib/utils'
import React, { useState } from 'react'
import { toast } from 'sonner'

export default function DtConfigCard() {
  const [shareableUrl, setShareableUrl] = useState('')
  const [shareableUrlShort, setShareableUrlShort] = useState('')
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleDateChange = (isoString: string) => {
    // Create the URL with the new route format
    const baseUrl = window.location.origin
    const dt = isoString.replace('|', '')

    // Update the shareable URL with full ISO string
    setShareableUrl(`${baseUrl}/${encodeURIComponent(dt)}`)

    // Update the shareable URL with shortened format
    const shortDt = shortenUrl(dt)
    setShareableUrlShort(`${baseUrl}/${shortDt}`)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold tracking-tight">zonr.dev - Time Zone Syncer</CardTitle>
        <CardDescription className="text-center">
          Enter the date, time, and time zone you want to share with others. When they open the page, they&apos;ll see
          the time in their timezone!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <DateTimePicker setDate={handleDateChange} />

        <div className="space-y-2 py-6">
          <h3 className="text-sm font-medium leading-none">Shareable Link</h3>
          <div className="flex h-10 gap-2">
            {mounted ? (
              <>
                <Input readOnly value={shareableUrl || ''} className="bg-background font-mono text-sm" />
                <Button
                  variant="secondary"
                  onClick={() => {
                    navigator.clipboard.writeText(shareableUrl || '')
                    toast.success('Copied to clipboard')
                  }}
                  className="hover:bg-secondary-hover"
                >
                  Copy
                </Button>
              </>
            ) : (
              <>
                <div className="bg-muted h-10 w-full animate-pulse rounded-md" />
                <Button variant="secondary" disabled>
                  Copy
                </Button>
              </>
            )}
          </div>
          <h3 className="text-sm font-medium leading-none">Short Shareable Link</h3>
          <div className="flex h-10 gap-2">
            {mounted ? (
              <>
                <Input readOnly value={shareableUrlShort || ''} className="bg-background font-mono text-sm" />
                <Button
                  variant="secondary"
                  onClick={() => {
                    navigator.clipboard.writeText(shareableUrlShort || '')
                    toast.success('Copied to clipboard')
                  }}
                  className="hover:bg-secondary-hover"
                >
                  Copy
                </Button>
              </>
            ) : (
              <>
                <div className="bg-muted h-10 w-full animate-pulse rounded-md" />
                <Button variant="secondary" disabled>
                  Copy
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
