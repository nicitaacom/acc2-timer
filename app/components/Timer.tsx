"use client"

import React, { useEffect, useState } from "react"

import { updateTimerFn } from "@/functions/updateTimerFn"
import { TimerInput } from "./TimerInput"
import { useRunTimerOnEnter } from "@/hooks/useRunTimerOnEnter"

export function Timer() {
  const [minutes, setMinutes] = useState(3)
  const [seconds, setSeconds] = useState(0)
  const [isTimeUp, setIsTimeUp] = useState(false)
  const [error, setError] = useState("")
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isTimerRunning && (minutes > 0 || seconds > 0)) {
      setIsTimerRunning(true) // Timer is running
      interval = setInterval(() => updateTimerFn(minutes, seconds, setMinutes, setSeconds, setIsTimerRunning), 1000)
    } else if (isTimeUp) {
      resetTimer()
    }

    return () => {
      clearInterval(interval)
      setIsTimerRunning(false) // Ensure timer is not running if interval is cleared
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimerRunning, minutes, seconds])

  const resetTimer = () => {
    setMinutes(3)
    setSeconds(0)
    setIsTimeUp(false)
    setError("")
    setIsTimerRunning(false)
  }

  const startPause = () => {
    if (minutes === 0 && seconds === 0) {
      resetTimer()
      return
    }
    setIsTimerRunning(prev => !prev)
    setError("")
  }

  useRunTimerOnEnter(startPause, isTimerRunning)

  return (
    <div className="border p-4 rounded-lg shadow-lg max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Таймер</h1>
      <div className="flex items-center justify-center mb-4">
        <TimerInput
          value={minutes}
          onChange={value => setMinutes(Math.min(value, 3))}
          max={3}
          placeholder="ММ"
          isTimerRunning={isTimerRunning}
        />
        <span className="mx-2 text-xl">:</span>
        <TimerInput
          value={seconds}
          onChange={value => {
            if (minutes < 3) {
              setSeconds(value)
              // don't allow to change seconds (because max is 3 minutes)
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
        <button
          onClick={startPause}
          tabIndex={-1}
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition`}>
          {isTimerRunning ? "Пауза" : isTimeUp ? "Старт" : "Старт"}
        </button>
        <button
          onClick={resetTimer}
          tabIndex={-1}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
          Сброс
        </button>
      </div>
      {error && <span className="text-sm text-danger">{error}</span>}
      {isTimeUp && <p className="mt-4 text-center text-red-500">Время вышло</p>}
    </div>
  )
}
