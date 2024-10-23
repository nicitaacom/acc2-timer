"use client"

import React, { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { useRunTimerOnEnter } from "@/hooks/useRunTimerOnEnter"
import { StartPauseButtons } from "./StartPauseButtons"
import { InputTimer } from "./InputTimer"

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

  const resetTimer = useCallback(() => {
    clearTimerInterval()
    setMinutes(3)
    setSeconds(0)
    setIsTimeUp(false)
    setIsTimerRunning(false)
  }, [clearTimerInterval])

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
  }, [minutes, seconds, isTimerRunning, clearTimerInterval, resetTimer])

  useRunTimerOnEnter(startPause, setIsTimerRunning, isTimerRunning)

  console.log(76, "re-render")

  return (
    <div className="border p-4 rounded-lg shadow-lg max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Таймер</h1>
      <InputTimer
        seconds={seconds}
        setSeconds={setSeconds}
        minutes={minutes}
        setMinutes={setMinutes}
        setIsTimeUp={setIsTimeUp}
        clearTimerInterval={clearTimerInterval}
        setIsTimerRunning={setIsTimerRunning}
        isTimerRunning={isTimerRunning}
        intervalRef={intervalRef}
      />
      <div className="flex justify-center space-x-4 mt-4">
        <StartPauseButtons startPause={startPause} resetTimer={resetTimer} isTimerRunning={isTimerRunning} />
      </div>
      {isTimeUp && <p className="mt-4 text-center text-red-500">Время вышло</p>}
    </div>
  )
}
