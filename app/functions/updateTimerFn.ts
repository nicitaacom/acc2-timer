export function updateTimerFn(
  minutes: number,
  seconds: number,
  setMinutes: React.Dispatch<React.SetStateAction<number>>,
  setSeconds: React.Dispatch<React.SetStateAction<number>>,
  setIsTimerRunning: React.Dispatch<React.SetStateAction<boolean>>,
) {
  // Calculate new minutes and seconds
  let newMinutes = minutes
  let newSeconds = seconds - 1

  // If seconds have reached below 0
  if (newSeconds < 0) {
    newSeconds = 59 // Reset seconds
    newMinutes -= 1 // Decrease minute
  }

  // Handle timer finishing condition
  if (newMinutes < 0) {
    setIsTimerRunning(false)
    return // to don't execute fruther code
  }

  setSeconds(newSeconds)
  setMinutes(newMinutes)
}
