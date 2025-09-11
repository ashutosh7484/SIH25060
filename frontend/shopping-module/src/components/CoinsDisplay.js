"use client"

import { useState } from "react"
import { useCoins } from "../context/CoinsContext"

const CoinsDisplay = () => {
  const { coins, transactions } = useCoins()
  const [showHistory, setShowHistory] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 px-4 py-2 rounded-full transition-colors"
      >
        <span className="text-yellow-300 text-lg">⭐</span>
        <span className="font-semibold text-white">{coins}</span>
        <span className="text-green-100 text-sm">Minecoins</span>
        <span className="text-green-200 text-xs">▼</span>
      </button>

      {/* Dropdown History */}
      {showHistory && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800">Minecoins History</h3>
            <p className="text-sm text-gray-600">1 Minecoin = ₹10 spent</p>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {transactions && transactions.length > 0 ? (
              transactions
                .slice()
                .reverse()
                .map((transaction, index) => (
                  <div key={index} className="p-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-green-600">+{transaction.coins} Minecoins</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-700">Purchase: ₹{transaction.amount}</p>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                <p>No transactions yet</p>
                <p className="text-xs">Make a purchase to earn Minecoins!</p>
              </div>
            )}
          </div>

          <div className="p-3 bg-gray-50 rounded-b-lg">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Total Balance:</span>
              <span className="font-bold text-green-600">{coins} Minecoins</span>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {showHistory && <div className="fixed inset-0 z-40" onClick={() => setShowHistory(false)} />}
    </div>
  )
}

export default CoinsDisplay
