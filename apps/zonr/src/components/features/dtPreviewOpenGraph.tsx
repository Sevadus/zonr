'use client'

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Progress } from '@/components/ui/progress'
import { useEffect, useRef, useState } from 'react'
import { LuInfo } from 'react-icons/lu'

export default function DtPreviewOpenGraph({ dt }: { dt: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentImageUrl, setCurrentImageUrl] = useState(`/opengraph-image?dt=${dt}`)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const unblurTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)
  const animationRef = useRef<number | null>(null)
  const lastDtRef = useRef(dt)
  const durationRef = useRef(Math.random() * 3000 + 2000) // Random duration between 2000 and 5000ms

  // Reset animation and start loading when dt changes
  useEffect(() => {
    // Skip if dt hasn't changed
    if (dt === lastDtRef.current) return

    // Helper function to complete the loading process with a delay before unblurring
    const completeLoading = () => {
      // First update the image URL to start loading
      setCurrentImageUrl(`/opengraph-image?dt=${dt}`)

      // Clear any existing unblur timeout
      if (unblurTimeoutRef.current) {
        clearTimeout(unblurTimeoutRef.current)
      }

      // Set a timeout to remove the loading UI after 200ms
      unblurTimeoutRef.current = setTimeout(() => {
        setIsLoading(false)
        lastDtRef.current = dt
        unblurTimeoutRef.current = null
      }, 200)
    }

    // Animation function to update progress
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current
      const duration = durationRef.current
      const newProgress = Math.min((elapsed / duration) * 100, 100)

      setProgress(newProgress)

      if (elapsed < duration) {
        // Continue animation
        animationRef.current = requestAnimationFrame(animate)
      } else {
        // Ensure we hit 100% exactly
        setProgress(100)
        // Complete the loading process with delay
        completeLoading()
        animationRef.current = null
      }
    }

    // Clean up any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    // Clean up any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    if (unblurTimeoutRef.current) {
      clearTimeout(unblurTimeoutRef.current)
      unblurTimeoutRef.current = null
    }

    // Start new loading animation
    setIsLoading(true)
    setProgress(0)
    startTimeRef.current = Date.now()
    // Set a new random duration for this animation
    durationRef.current = Math.random() * 3000 + 2000

    // Start the animation loop
    animationRef.current = requestAnimationFrame(animate)

    // Set a backup timeout to ensure completion (add a small buffer to ensure animation completes first)
    timeoutRef.current = setTimeout(() => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }

      // Ensure progress is 100% when we finish
      setProgress(100)
      // Complete the loading process with delay
      completeLoading()
    }, durationRef.current + 50)

    // Cleanup on unmount or when dt changes again
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }

      if (unblurTimeoutRef.current) {
        clearTimeout(unblurTimeoutRef.current)
        unblurTimeoutRef.current = null
      }
    }
  }, [dt])

  return (
    <div className="text-center">
      <h3 className="text-md mb-4 flex items-center justify-center gap-2 font-bold leading-none">
        Open Graph Preview
        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            <span className="cursor-help">
              <LuInfo className="h-4 w-4" />
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 text-sm" side="right">
            <div className="space-y-2">
              <h4 className="font-bold">What is Open Graph?</h4>
              <p className="font-normal">
                Open Graph images are previews that appear when your link is shared on social media, messaging apps, or
                other platforms.
              </p>
              <p className="font-normal">
                When you send a message with one of the above links in it on a platform that supports preview images,
                the preview image will be the open graph image below to allow others to instantly see time conversions
                around the world.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </h3>
      {/* eslint-disable @next/next/no-img-element */}
      <div className="relative mx-auto w-3/4">
        <img
          src={currentImageUrl}
          alt="zonr"
          className={`w-full rounded-lg transition-all duration-300 ${isLoading ? 'blur-md' : ''}`}
        />

        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-primary mb-6 text-2xl font-bold">Loading Preview...</div>
            <Progress value={progress} className="h-1 w-1/2" />
          </div>
        )}
      </div>
    </div>
  )
}
