'use client'

import { Button } from '@/components/ui/button'
import { expandUrl } from '@/lib/utils'
import { DateTime } from 'luxon'
import { useState } from 'react'
import { LuX } from 'react-icons/lu'

export default function DtConvertCard({ dt }: { dt: string }) {
  const [isVisible, setIsVisible] = useState(true)
  if (dt.length < 19) {
    dt = expandUrl(dt)
  }
  const dtObj = DateTime.fromISO(dt)
  const dtObj_sender = DateTime.fromISO(dt, { setZone: true })

  if (!isVisible) return null

  return (
    <div className="bg-card relative space-y-2 rounded-lg border p-8 text-center">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2"
        onClick={() => {
          const url = new URL(window.location.href)
          url.searchParams.delete('dt')
          window.history.replaceState({}, '', url.toString())
          setIsVisible(false)
        }}
      >
        <LuX className="size-4" />
      </Button>
      <h3 className="text-xl">{dtObj_sender.toLocaleString(DateTime.DATETIME_FULL)}</h3>
      <p className="text-muted-foreground text-lg">in your local timezone is</p>
      <h2 className="text-4xl">{dtObj.toLocaleString(DateTime.DATETIME_FULL)}</h2>
    </div>
  )
}
