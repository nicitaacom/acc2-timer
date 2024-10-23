"use client"

import React, { useCallback, useEffect, useMemo } from "react"
import TimerInput from "./TimerInput"
import { updateTimerFn } from "@/functions/updateTimerFn"

interface InputTimerProps {
  isTimerRunning: boolean
  setMinutes: React.Dispatch<React.SetStateAction<number>>
  setSeconds: React.Dispatch<React.SetStateAction<number>>
  setIsTimeUp: React.Dispatch<React.SetStateAction<boolean>>
  clearTimerInterval: () => void
  setIsTimerRunning: React.Dispatch<React.SetStateAction<boolean>>
  minutes: number
  seconds: number
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>
}

// Memoize InputTimer to prevent re-renders unless props change
export const InputTimer = React.memo(function InputTimer({
  isTimerRunning,
  setMinutes,
  setSeconds,
  setIsTimeUp,
  clearTimerInterval,
  setIsTimerRunning,
  minutes,
  seconds,
  intervalRef,
}: InputTimerProps) {
  // Memoize class name to avoid unnecessary re-renders
  const timerInputClassName = useMemo(
    () => (isTimerRunning ? "cursor-default pointer-events-none bg-black text-white border-0 outline-none" : ""),
    [isTimerRunning],
  )

  // Memoize the change handlers
  const handleMinutesChange = useCallback(
    (value: number) => {
      setMinutes(Math.min(value, 3))
    },
    [setMinutes],
  )

  const handleSecondsChange = useCallback(
    (value: number) => {
      if (minutes < 3) setSeconds(value)
      else if (minutes === 3 && value <= 0) setSeconds(value)
    },
    [minutes, setSeconds],
  )

  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          setIsTimeUp(true)
          clearTimerInterval()
          setIsTimerRunning(false)
        } else {
          updateTimerFn(minutes, seconds, setMinutes, setSeconds, setIsTimerRunning)
        }
      }, 1000)
    } else {
      clearTimerInterval()
    }

    return clearTimerInterval
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimerRunning, minutes, seconds, clearTimerInterval])

  return (
    <div className="flex items-center justify-center mb-4">
      <TimerInput
        className={timerInputClassName}
        isTimerRunning={isTimerRunning}
        value={minutes}
        onChange={handleMinutesChange}
        max={3}
        placeholder="mm"
      />
      <span className="mx-2 text-xl">:</span>
      <TimerInput
        className={timerInputClassName}
        value={seconds}
        onChange={handleSecondsChange}
        max={59}
        placeholder="ss"
        isTimerRunning={isTimerRunning}
      />
    </div>
  )
})
