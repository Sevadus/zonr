'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DateTimePicker } from '@/components/ui/date-time-picker'
import { Input } from '@/components/ui/input'
import { formatInTimeZone } from 'date-fns-tz'
import React, { useState } from 'react'
import { toast } from 'sonner'

// Top 10 most common timezones with their display info
const commonTimezones = [
  { zone: 'America/New_York', label: 'New York (EST)', flag: 'us' },
  { zone: 'America/Los_Angeles', label: 'Los Angeles (PST)', flag: 'us' },
  { zone: 'Europe/London', label: 'London (GMT)', flag: 'gb' },
  { zone: 'Europe/Paris', label: 'Paris (CET)', flag: 'fr' },
  { zone: 'Asia/Tokyo', label: 'Tokyo (JST)', flag: 'jp' },
  { zone: 'Asia/Shanghai', label: 'Shanghai (CST)', flag: 'cn' },
  { zone: 'Asia/Dubai', label: 'Dubai (GST)', flag: 'ae' },
  { zone: 'Australia/Sydney', label: 'Sydney (AEST)', flag: 'au' },
  { zone: 'Asia/Singapore', label: 'Singapore (SGT)', flag: 'sg' },
  { zone: 'Europe/Berlin', label: 'Berlin (CET)', flag: 'de' },
]

export default function DtConfigCard() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [shareableUrl, setShareableUrl] = useState('')
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleDateChange = (isoString: string) => {
    // Parse the ISO string while preserving the timezone
    //const isoStringDT = isoString.split('|')[0];
    const isoStringDT = isoString.replace('|', '')
    const date = new Date(isoStringDT)
    setSelectedDate(date)

    // Set the url parameter dt with the new isoString (urlencoded)
    const url = new URL(window.location.href)
    url.searchParams.set('dt', encodeURIComponent(isoString.replace('|', '')))
    //window.history.replaceState({}, '', url.toString());
    // Update the shareable URL
    setShareableUrl(url.toString())
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold tracking-tight">
          zonr.dev - Time Zone Syncer
        </CardTitle>
        <CardDescription className="text-center">
          Enter the date, time, and time zone you want to share with others. When they open the
          page, they&apos;ll see the time in their timezone!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <DateTimePicker setDate={handleDateChange} />

        <div className="space-y-2 py-6">
          <h3 className="text-sm font-medium leading-none">Shareable Link</h3>
          <div className="flex h-10 gap-2">
            {mounted ? (
              <>
                <Input readOnly value={shareableUrl || ''} className="font-mono text-sm" />
                <Button
                  variant="secondary"
                  onClick={() => {
                    navigator.clipboard.writeText(shareableUrl || '')
                    toast.success('Copied to clipboard')
                  }}
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

        <div className="bg-muted/50 space-y-2 rounded-lg border p-4">
          <h3 className="text-sm font-medium">Common Time Zones</h3>
          <div className="grid gap-2 md:grid-cols-2">
            {/* eslint-disable @next/next/no-img-element */}
            {commonTimezones.map((tz) => (
              <div key={tz.zone} className="h-5 text-sm">
                {mounted && selectedDate ? (
                  <>
                    {tz.flag && (
                      <img
                        src={`https://flagcdn.com/24x18/${tz.flag}.png`}
                        alt={tz.label}
                        className="mr-1 inline-block h-4"
                      />
                    )}
                    {formatInTimeZone(selectedDate, tz.zone, 'MMM d, h:mm a')}
                    {' in '}
                    {tz.label}
                  </>
                ) : (
                  <div className="bg-muted h-5 w-full animate-pulse rounded-md" />
                )}
              </div>
            ))}
            {/* eslint-enable @next/next/no-img-element */}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
