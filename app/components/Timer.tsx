"use client"

import React, { useEffect, useState, useRef, useCallback } from "react"
import { updateTimerFn } from "@/functions/updateTimerFn"
import { TimerInput } from "./TimerInput"
import { useRunTimerOnEnter } from "@/hooks/useRunTimerOnEnter"
import { StartPauseButtons } from "./StartPauseButtons"

export function Timer() {
  const [minutes, setMinutes] = useState(3)
  const [seconds, setSeconds] = useState(0)
  const [isTimeUp, setIsTimeUp] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startPause = useCallback(() => {
    if (minutes === 0 && seconds === 0) {
      resetTimer()
      return
    }

    if (isTimerRunning) {
      clearTimerInterval()
      setIsTimerRunning(false)
    } else {
      setIsTimeUp(false)
      setIsTimerRunning(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes, seconds, isTimerRunning, clearTimerInterval])

  const resetTimer = useCallback(() => {
    clearTimerInterval()
    setMinutes(3)
    setSeconds(0)
    setIsTimeUp(false)
    setIsTimerRunning(false)
  }, [clearTimerInterval])

  useRunTimerOnEnter(startPause, setIsTimerRunning, isTimerRunning)

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
  }, [isTimerRunning, minutes, seconds, clearTimerInterval])

  // Function to determine the appropriate class name
  const getTimerInputClassName = () => {
    if (isTimerRunning) {
      return "cursor-default pointer-events-none bg-black text-white border-0 outline-none"
    }
    return ""
  }

  return (
    <div className="border p-4 rounded-lg shadow-lg max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Таймер</h1>
      <div className="flex items-center justify-center mb-4">
        <TimerInput
          className={getTimerInputClassName()}
          isTimerRunning={isTimerRunning}
          value={minutes}
          onChange={value => {
            // Allow user to set minutes to 0 without triggering "Время вышло"
            setMinutes(Math.min(value, 3))
          }}
          max={3}
          placeholder="ММ"
        />
        <span className="mx-2 text-xl">:</span>
        <TimerInput
          className={getTimerInputClassName()}
          value={seconds}
          onChange={value => {
            // Allow setting seconds only when minutes are less than 3
            if (minutes < 3) {
              setSeconds(value)
            } else if (minutes === 3 && value <= 0) {
              setSeconds(value)
            }
          }}
          max={59}
          placeholder="СС"
          isTimerRunning={isTimerRunning}
        />
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <StartPauseButtons startPause={startPause} resetTimer={resetTimer} isTimerRunning={isTimerRunning} />
      </div>
      {isTimeUp && <p className="mt-4 text-center text-red-500">Время вышло</p>}
    </div>
  )
}
