import { useEffect, useState } from "react"

export const useTimer = (initialMinutes: number, initialSeconds: number) => {
  const [minutes, setMinutes] = useState(initialMinutes)
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isActive, setIsActive] = useState(false)
  const [isTimeUp, setIsTimeUp] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        setSeconds(prev => {
          if (prev === 0) {
            if (minutes > 0) {
              setMinutes(m => m - 1)
              return 59
            } else {
              clearInterval(interval)
              setIsTimeUp(true)
              return 0
            }
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isActive, minutes, seconds])

  const startPause = () => setIsActive(prev => !prev)
  const reset = () => {
    setIsActive(false)
    setMinutes(initialMinutes)
    setSeconds(initialSeconds)
    setIsTimeUp(false)
  }

  return { minutes, seconds, isActive, isTimeUp, startPause, reset }
}
