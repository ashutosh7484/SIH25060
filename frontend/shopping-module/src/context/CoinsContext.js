"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CoinsContext = createContext()

export const CoinsProvider = ({ children }) => {
  const [coins, setCoins] = useState(0)
  const [transactions, setTransactions] = useState([])

  // Load coins and transactions from localStorage on mount
  useEffect(() => {
    const savedCoins = localStorage.getItem("wasteUtilitiesCoins")
    const savedTransactions = localStorage.getItem("wasteUtilitiesTransactions")

    if (savedCoins) {
      setCoins(Number.parseInt(savedCoins, 10))
    }
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    }
  }, [])

  // Save coins to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("wasteUtilitiesCoins", coins.toString())
  }, [coins])

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("wasteUtilitiesTransactions", JSON.stringify(transactions))
  }, [transactions])

  const addCoins = (purchaseAmount) => {
    const coinsEarned = Math.floor(purchaseAmount / 10) // 1 coin per ₹10 spent

    if (coinsEarned > 0) {
      setCoins((prevCoins) => prevCoins + coinsEarned)

      // Add transaction record
      const newTransaction = {
        coins: coinsEarned,
        amount: purchaseAmount,
        date: new Date().toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        timestamp: Date.now(),
      }

      setTransactions((prevTransactions) => [...prevTransactions, newTransaction])
    }

    return coinsEarned
  }

  const spendCoins = (amount) => {
    if (coins >= amount) {
      setCoins((prevCoins) => prevCoins - amount)
      return true
    }
    return false
  }

  return <CoinsContext.Provider value={{ coins, transactions, addCoins, spendCoins }}>{children}</CoinsContext.Provider>
}

export const useCoins = () => {
  const context = useContext(CoinsContext)
  if (!context) {
    throw new Error("useCoins must be used within a CoinsProvider")
  }
  return context
}
