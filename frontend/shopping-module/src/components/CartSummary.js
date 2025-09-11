"use client"

import { useCart } from "../context/CartContext"
import { useCoins } from "../context/CoinsContext"

const CartSummary = ({ onCheckout }) => {
  const { cartItems, getTotalPrice } = useCart()
  const { coins } = useCoins()

  const totalPrice = getTotalPrice()
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const coinsToEarn = Math.floor(totalPrice / 10)

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Items ({totalItems})</span>
          <span className="font-semibold">₹{totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold text-green-600">Free</span>
        </div>
        <hr className="border-gray-200" />
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>
      </div>

      {/* Coins Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-yellow-600">⭐</span>
          <span className="font-semibold text-yellow-800">Minecoins Reward</span>
        </div>
        <p className="text-sm text-yellow-700">
          You'll earn <strong>{coinsToEarn} Minecoins</strong> from this purchase!
        </p>
        <p className="text-xs text-yellow-600 mt-1">Current balance: {coins} Minecoins</p>
      </div>

      <button
        onClick={onCheckout}
        disabled={cartItems.length === 0}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors"
      >
        {cartItems.length === 0 ? "Cart is Empty" : "Proceed to Checkout"}
      </button>
    </div>
  )
}

export default CartSummary
