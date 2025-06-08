"use client"

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
      <p className="text-red-800 mb-2">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="text-red-600 hover:text-red-800 underline text-sm">
          Try again
        </button>
      )}
    </div>
  )
}
