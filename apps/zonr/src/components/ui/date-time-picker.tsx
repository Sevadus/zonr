'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { getTimeZones } from '@vvo/tzdb'
import { DateTime } from 'luxon'
import * as React from 'react'
import { LuCalendarDays } from 'react-icons/lu'

// Get timezone data from tzdb
const timezoneGroups = [
  {
    region: 'Popular',
    zones: getTimeZones().filter((tz) =>
      ['America/New_York', 'America/Los_Angeles', 'Europe/London', 'Asia/Tokyo', 'UTC'].includes(
        tz.name
      )
    ),
  },
  {
    region: 'US & Canada',
    zones: getTimeZones().filter(
      (tz) =>
        tz.name.startsWith('America/') &&
        (tz.mainCities.length > 0 ||
          ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles'].includes(
            tz.name
          ))
    ),
  },
  {
    region: 'Europe',
    zones: getTimeZones().filter(
      (tz) =>
        tz.name.startsWith('Europe/') &&
        (tz.mainCities.length > 0 ||
          ['Europe/London', 'Europe/Paris', 'Europe/Berlin'].includes(tz.name))
    ),
  },
  {
    region: 'Asia',
    zones: getTimeZones().filter(
      (tz) =>
        tz.name.startsWith('Asia/') &&
        (tz.mainCities.length > 0 ||
          ['Asia/Dubai', 'Asia/Singapore', 'Asia/Tokyo', 'Asia/Hong_Kong'].includes(tz.name))
    ),
  },
  {
    region: 'Pacific',
    zones: getTimeZones().filter(
      (tz) =>
        (tz.name.startsWith('Pacific/') || tz.name.startsWith('Australia/')) &&
        (tz.mainCities.length > 0 || ['Australia/Sydney', 'Pacific/Auckland'].includes(tz.name))
    ),
  },
]

interface TimeState {
  year: string
  month: string
  day: string
  hour: string
  minute: string
  second: string
  ampm: 'AM' | 'PM'
  timezone: string
}

export interface DateTimePickerProps {
  setDate?: (isoString: string) => void
}

export function DateTimePicker({ setDate }: DateTimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const hasInitialized = React.useRef(false)

  const [timeState, setTimeState] = React.useState<TimeState>(() => {
    const now = new Date()
    return {
      year: now.getFullYear().toString(),
      month: (now.getMonth() + 1).toString().padStart(2, '0'),
      day: now.getDate().toString().padStart(2, '0'),
      hour: (now.getHours() % 12 || 12).toString(),
      minute: now.getMinutes().toString().padStart(2, '0'),
      second: now.getSeconds().toString().padStart(2, '0'),
      ampm: now.getHours() >= 12 ? 'PM' : 'AM',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }
  })

  const emitDateChange = React.useCallback(
    (newState: TimeState) => {
      if (!setDate) return

      const hour24 =
        newState.ampm === 'PM' ? (parseInt(newState.hour) % 12) + 12 : parseInt(newState.hour) % 12

      const dt = DateTime.fromObject(
        {
          year: parseInt(newState.year),
          month: parseInt(newState.month),
          day: parseInt(newState.day),
          hour: hour24,
          minute: parseInt(newState.minute),
          second: parseInt(newState.second),
        },
        { zone: newState.timezone }
      )

      const isoString = `${newState.year}-${newState.month}-${newState.day}T${hour24.toString().padStart(2, '0')}:${newState.minute}:${newState.second}|${dt.toFormat('ZZ')}`
      setDate(isoString)
    },
    [setDate]
  )

  // Update mounted state and emit initial date
  React.useEffect(() => {
    if (!hasInitialized.current) {
      setMounted(true)
      emitDateChange(timeState)
      hasInitialized.current = true
    }
  }, [emitDateChange, timeState])

  const selectedHourRef = React.useRef<HTMLButtonElement>(null)
  const selectedMinuteRef = React.useRef<HTMLButtonElement>(null)
  const selectedSecondRef = React.useRef<HTMLButtonElement>(null)
  const selectedAMPMRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        selectedHourRef.current?.scrollIntoView({ block: 'center' })
        selectedMinuteRef.current?.scrollIntoView({ block: 'center' })
        selectedSecondRef.current?.scrollIntoView({ block: 'center' })
        selectedAMPMRef.current?.scrollIntoView({ block: 'center' })
      }, 0)
    }
  }, [isOpen])

  const handleCalendarSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return

    const newState = {
      ...timeState,
      year: selectedDate.getFullYear().toString(),
      month: (selectedDate.getMonth() + 1).toString().padStart(2, '0'),
      day: selectedDate.getDate().toString().padStart(2, '0'),
    }

    setTimeState(newState)
    emitDateChange(newState)
  }

  const handleTimeChange = (
    type: keyof Omit<TimeState, 'year' | 'month' | 'day'>,
    value: string
  ) => {
    const newState = { ...timeState, [type]: value }
    setTimeState(newState)
    emitDateChange(newState)
  }

  const formatDisplayDate = () => {
    const { month, day, year, hour, minute, second, ampm, timezone } = timeState
    return `${month}/${day}/${year} ${hour}:${minute}:${second} ${ampm} (${timezone})`
  }

  if (!mounted) {
    return (
      <Button variant="outline" className="h-12 w-full justify-start text-left text-xl font-normal">
        <LuCalendarDays className="mr-2 !size-6" />
        <span>Loading...</span>
      </Button>
    )
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn('h-12 w-full justify-start text-left text-xl font-normal')}
        >
          <LuCalendarDays className="mr-2 !size-6" />
          <span>{formatDisplayDate()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto p-0">
        <Calendar
          mode="single"
          selected={new Date(`${timeState.year}-${timeState.month}-${timeState.day}`)}
          onSelect={handleCalendarSelect}
          initialFocus
        />
        <div className="flex divide-x border-l">
          <ScrollArea className="h-[300px] w-16">
            <div className="flex flex-col p-2">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                <Button
                  key={hour}
                  ref={timeState.hour === hour.toString() ? selectedHourRef : null}
                  size="icon"
                  variant={timeState.hour === hour.toString() ? 'default' : 'ghost'}
                  className="w-full"
                  onClick={() => handleTimeChange('hour', hour.toString())}
                >
                  {hour}
                </Button>
              ))}
            </div>
            <ScrollBar />
          </ScrollArea>
          <ScrollArea className="h-[300px] w-16">
            <div className="flex flex-col p-2">
              {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                <Button
                  key={minute}
                  ref={
                    timeState.minute === minute.toString().padStart(2, '0')
                      ? selectedMinuteRef
                      : null
                  }
                  size="icon"
                  variant={
                    timeState.minute === minute.toString().padStart(2, '0') ? 'default' : 'ghost'
                  }
                  className="w-full"
                  onClick={() => handleTimeChange('minute', minute.toString().padStart(2, '0'))}
                >
                  {minute.toString().padStart(2, '0')}
                </Button>
              ))}
            </div>
            <ScrollBar />
          </ScrollArea>
          <ScrollArea className="h-[300px] w-16">
            <div className="flex flex-col p-2">
              {Array.from({ length: 60 }, (_, i) => i).map((second) => (
                <Button
                  key={second}
                  ref={
                    timeState.second === second.toString().padStart(2, '0')
                      ? selectedSecondRef
                      : null
                  }
                  size="icon"
                  variant={
                    timeState.second === second.toString().padStart(2, '0') ? 'default' : 'ghost'
                  }
                  className="w-full"
                  onClick={() => handleTimeChange('second', second.toString().padStart(2, '0'))}
                >
                  {second.toString().padStart(2, '0')}
                </Button>
              ))}
            </div>
            <ScrollBar />
          </ScrollArea>
          <ScrollArea className="h-[300px] w-16">
            <div className="flex flex-col p-2">
              {(['AM', 'PM'] as const).map((ampm) => (
                <Button
                  key={ampm}
                  ref={timeState.ampm === ampm ? selectedAMPMRef : null}
                  size="icon"
                  variant={timeState.ampm === ampm ? 'default' : 'ghost'}
                  className="w-full"
                  onClick={() => handleTimeChange('ampm', ampm)}
                >
                  {ampm}
                </Button>
              ))}
            </div>
          </ScrollArea>
          <ScrollArea className="h-[300px] w-[250px]">
            <div className="flex flex-col p-2">
              {timezoneGroups.map((group) => (
                <div key={group.region} className="mb-4">
                  <div className="text-muted-foreground mb-1 px-2 text-sm font-medium">
                    {group.region}
                  </div>
                  {group.zones.map((zone) => (
                    <Button
                      key={zone.name}
                      variant={timeState.timezone === zone.name ? 'default' : 'ghost'}
                      className="w-full justify-start py-2 text-left"
                      onClick={() => handleTimeChange('timezone', zone.name)}
                    >
                      <div className="flex w-full flex-col">
                        <span className="font-medium">
                          {zone.mainCities.length > 0
                            ? zone.mainCities[0]
                            : zone.name.split('/').pop()}
                        </span>
                        <span className="text-muted-foreground pl-2 text-xs">
                          {(() => {
                            try {
                              return (
                                new Intl.DateTimeFormat('en-US', {
                                  timeZone: zone.name,
                                  timeZoneName: 'shortOffset',
                                  hour12: false,
                                })
                                  .formatToParts(new Date())
                                  .find((part) => part.type === 'timeZoneName')?.value || ''
                              )
                            } catch {
                              return ''
                            }
                          })()}
                        </span>
                      </div>
                    </Button>
                  ))}
                </div>
              ))}
            </div>
            <ScrollBar />
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}
