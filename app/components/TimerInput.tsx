import { useCallback } from "react"
import { twMerge } from "tailwind-merge"

type TimerInputProps = {
  value: number
  onChange: (value: number) => void
  max: number
  placeholder: string
  isTimerRunning: boolean
  className?: string
}

export function TimerInput({ value, onChange, max, placeholder, className, isTimerRunning }: TimerInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    // Allow clearing input to empty
    if (newValue === "") {
      onChange(0) // You may want to manage this differently in your state
      return
    }

    // Convert input to a number
    const numericValue = Number(newValue)

    // Validate numeric input
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= max) {
      onChange(numericValue) // Only set if within range
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e
    // Allow backspace, delete, tab, enter, arrow keys
    if (["Backspace", "Delete", "Tab", "Enter", "ArrowLeft", "ArrowRight"].includes(key)) return
    // Prevent non-numeric keys
    if (!/^[0-9]$/.test(key)) e.preventDefault()
  }

  return (
    <input
      className={twMerge("border rounded-lg p-2 w-16 text-center", className)}
      type="text"
      value={value === 0 ? "00" : value} // Display empty when value is 0
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      disabled={isTimerRunning} // to don't allow user change values using when timer is running
      placeholder={placeholder}
      tabIndex={isTimerRunning ? -1 : 1}
    />
  )
}
