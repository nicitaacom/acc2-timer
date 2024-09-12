"use client"

interface StartPauseButtonsProps {
  startPause: () => void
  resetTimer: () => void
  isTimerRunning: boolean
}

export function StartPauseButtons({ startPause, resetTimer, isTimerRunning }: StartPauseButtonsProps) {
  return (
    <>
      <button
        onClick={startPause}
        tabIndex={-1}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
        {isTimerRunning ? "Пауза" : "Старт"}
      </button>
      <button
        onClick={resetTimer}
        tabIndex={-1}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
        Сброс
      </button>
    </>
  )
}
