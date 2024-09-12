import { useEffect } from "react"

export const useRunTimerOnEnter = (startPause: () => void, isTimerRunning: boolean) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && !isTimerRunning) {
        startPause() // Fire startPause if timer is not running
      } else if (event.key === "Escape" && isTimerRunning) {
        startPause() // Fire startPause if timer is running
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimerRunning])
}
