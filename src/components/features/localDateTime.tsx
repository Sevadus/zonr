'use client'

import { useQueryState } from 'nuqs'

export function LocalDateTime() {
  const [localDateTime, ] = useQueryState('dt')

  return <div className='text-4xl font-bold text-foreground'>{localDateTime}</div>
}