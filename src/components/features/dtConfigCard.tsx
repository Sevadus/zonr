'use client';

import { formatInTimeZone } from 'date-fns-tz';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { Input } from '@/components/ui/input';

// Top 10 most common timezones with their display info
const commonTimezones = [
  { zone: 'America/New_York', label: '🇺🇸 New York (EST)', flag: '🇺🇸' },
  { zone: 'America/Los_Angeles', label: '🇺🇸 Los Angeles (PST)', flag: '🇺🇸' },
  { zone: 'Europe/London', label: '🇬🇧 London (GMT)', flag: '🇬🇧' },
  { zone: 'Europe/Paris', label: '🇪🇺 Paris (CET)', flag: '🇫🇷' },
  { zone: 'Asia/Tokyo', label: '🇯🇵 Tokyo (JST)', flag: '🇯🇵' },
  { zone: 'Asia/Shanghai', label: '🇨🇳 Shanghai (CST)', flag: '🇨🇳' },
  { zone: 'Asia/Dubai', label: '🇦🇪 Dubai (GST)', flag: '🇦🇪' },
  { zone: 'Australia/Sydney', label: '🇦🇺 Sydney (AEST)', flag: '🇦🇺' },
  { zone: 'Asia/Singapore', label: '🇸🇬 Singapore (SGT)', flag: '🇸🇬' },
  { zone: 'Europe/Berlin', label: '🇩🇪 Berlin (CET)', flag: '🇩🇪' },
];

export default function DtConfigCard() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [shareableUrl, setShareableUrl] = useState('');

  const handleDateChange = (isoString: string) => {
    // Parse the ISO string while preserving the timezone
    const isoStringDT = isoString.split('|')[0];
    const date = new Date(isoStringDT);
    setSelectedDate(date);

    // Set the url parameter dt with the new isoString (urlencoded)
    const url = new URL(window.location.href);
    url.searchParams.set('dt', encodeURIComponent(isoString.replace('|', '')));
    window.history.replaceState({}, '', url.toString());
    // Update the shareable URL
    setShareableUrl(url.toString());
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight text-center">
          zonr.dev - Time Zone Syncer
        </CardTitle>
        <CardDescription className="text-center">
          Enter the date, time, and time zone you want to share with others.
          When they open the page, they&apos;ll see the time in their timezone!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <DateTimePicker setDate={handleDateChange} />

        <div className="space-y-2 py-6">
          <h3 className="text-sm font-medium leading-none">Shareable Link</h3>
          <div className="flex gap-2">
            <Input
              readOnly
              value={shareableUrl || ''}
              className="font-mono text-sm"
            />
            <Button
              variant="secondary"
              onClick={() => {
                navigator.clipboard.writeText(shareableUrl || '');
              }}
            >
              Copy
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
          <h3 className="text-sm font-medium">Common Time Zones</h3>
          <div className="grid gap-2 md:grid-cols-2">
            {commonTimezones.map((tz) => (
              <div key={tz.zone} className="text-sm">
                {selectedDate ? (
                  <>
                    {tz.flag}{' '}
                    {formatInTimeZone(selectedDate, tz.zone, 'MMM d, h:mm a')}
                  </>
                ) : (
                  <>{tz.label}</>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
