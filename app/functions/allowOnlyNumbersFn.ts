export function allowOnlyNumbersFn(e: React.KeyboardEvent<HTMLInputElement>, maxCharacters: number, maxNumber: number) {
  const { key, target } = e
  const { value } = target as HTMLInputElement

  // Prevent typing a second zero at the start (e.g., "00").
  if (value[0] === "0" && key === "0") {
    e.preventDefault()
    return
  }

  // Allow only backspace, delete, tab, and enter.
  if (["Backspace", "Delete", "Tab", "Enter"].includes(key)) {
    return
  }

  // Check if the pressed key is a number.
  if (!/^[0-9]$/.test(key)) {
    e.preventDefault() // Prevent non-numeric key presses.
    return
  }

  // If a number is being entered and it exceeds the character limit.
  if (value.length >= maxCharacters) {
    e.preventDefault() // Prevent typing more than max characters.
    return
  }

  // Check temp value after key
  const attemptValue = value + key // Form the new value after the key press.

  // Convert the new value to a number for comparison.
  if (parseInt(attemptValue) > maxNumber) {
    e.preventDefault() // Prevent input if the new value exceeds maxNumber.
  }
}
