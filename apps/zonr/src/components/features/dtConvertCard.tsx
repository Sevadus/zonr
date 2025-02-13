'use client';

import { DateTime } from 'luxon';

import { useState } from 'react';
import { LuX } from 'react-icons/lu';

import { Button } from '@/components/ui/button';

export default function DtConvertCard({ dt }: { dt: string }) {
  const [isVisible, setIsVisible] = useState(true);
  const dtObj = DateTime.fromISO(dt);
  const dtObj_sender = DateTime.fromISO(dt, { setZone: true });

  if (!isVisible) return null;

  return (
    <div className="rounded-lg border bg-muted/50 p-8 space-y-2 text-center relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2"
        onClick={() => {
          const url = new URL(window.location.href);
          url.searchParams.delete('dt');
          window.history.replaceState({}, '', url.toString());
          setIsVisible(false);
        }}
      >
        <LuX className="size-4" />
      </Button>
      <h3 className="text-xl">
        {dtObj_sender.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)}
      </h3>
      <p className="text-lg text-muted-foreground">in your local timezone is</p>
      <h2 className="text-4xl">
        {dtObj.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)}
      </h2>
    </div>
  );
}
