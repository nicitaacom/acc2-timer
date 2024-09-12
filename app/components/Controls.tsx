interface ControlsProps {
  onStartPause: () => void
  onReset: () => void
  isActive: boolean
}

function Controls({ onStartPause, onReset, isActive }: ControlsProps) {
  return (
    <div className="flex justify-center space-x-4">
      <button
        onClick={onStartPause}
        className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition`}>
        {isActive ? "Пауза" : "Старт"}
      </button>
      <button onClick={onReset} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
        Сброс
      </button>
    </div>
  )
}

export default Controls
