"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useCoins } from "../context/CoinsContext"
import CartItem from "../components/CartItem"
import CartSummary from "../components/CartSummary"
import CoinsEarnedNotification from "../components/CoinsEarnedNotification"

const Cart = () => {
  const { cartItems, clearCart, getTotalPrice } = useCart()
  const { addCoins } = useCoins()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [coinsEarned, setCoinsEarned] = useState(0)

  const handleCheckout = async () => {
    if (cartItems.length === 0) return

    setIsCheckingOut(true)

    // Simulate checkout process
    setTimeout(() => {
      const totalPrice = getTotalPrice()
      const earned = addCoins(totalPrice) // Add coins based on purchase amount
      setCoinsEarned(earned)
      clearCart() // Clear the cart
      setOrderComplete(true)
      setIsCheckingOut(false)
    }, 2000)
  }

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <CoinsEarnedNotification coinsEarned={coinsEarned} onClose={() => setCoinsEarned(0)} />

        <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-6">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">Order Successful!</h1>
          <p className="text-green-700 mb-4">
            Thank you for your purchase. Your Minecoins have been added to your account.
          </p>
          {coinsEarned > 0 && (
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-4">
              <p className="text-yellow-800 font-semibold">🎉 You earned {coinsEarned} Minecoins from this purchase!</p>
            </div>
          )}
          <div className="flex justify-center gap-4">
            <Link
              to="/"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Continue Shopping
            </Link>
            <button
              onClick={() => setOrderComplete(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"
            >
              View Cart
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
        <Link
          to="/"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          {/* Clear Cart Button */}
          <div className="mt-6">
            <button onClick={clearCart} className="text-red-500 hover:text-red-700 font-medium transition-colors">
              Clear All Items
            </button>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <CartSummary onCheckout={handleCheckout} />
        </div>
      </div>

      {/* Checkout Loading */}
      {isCheckingOut && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Processing your order...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
