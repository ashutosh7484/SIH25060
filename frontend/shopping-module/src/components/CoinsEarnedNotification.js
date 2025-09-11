"use client"

import { useEffect, useState } from "react"

const CoinsEarnedNotification = ({ coinsEarned, onClose }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (coinsEarned > 0) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300) // Wait for animation to complete
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [coinsEarned, onClose])

  if (coinsEarned <= 0) return null

  return (
    <div
      className={`fixed top-20 right-4 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <div className="bg-yellow-400 text-yellow-900 px-6 py-4 rounded-lg shadow-lg border border-yellow-500">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⭐</span>
          <div>
            <p className="font-bold">Minecoins Earned!</p>
            <p className="text-sm">+{coinsEarned} Minecoins added to your account</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinsEarnedNotification
