'use client';

import { DateTime } from 'luxon';

export default function DtConvertCard({ dt }: { dt: string }) {
  const dtObj = DateTime.fromISO(dt);
  const dtObj_sender = DateTime.fromISO(dt, { setZone: true });

  return (
    <div className="rounded-lg border bg-muted/50 p-8 space-y-2 text-center">
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
