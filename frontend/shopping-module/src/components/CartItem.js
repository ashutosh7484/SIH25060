"use client"

import { useCart } from "../context/CartContext"

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id)
    } else {
      updateQuantity(item.id, newQuantity)
    }
  }

  const subtotal = item.price * item.quantity

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="w-full sm:w-24 h-24 flex-shrink-0">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="flex-grow">
          <h3 className="font-semibold text-lg text-gray-800 mb-1">{item.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{item.description}</p>
          <p className="text-green-600 font-semibold">₹{item.price} each</p>
        </div>

        {/* Quantity Controls */}
        <div className="flex flex-col sm:items-end gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700 transition-colors"
            >
              -
            </button>
            <span className="w-12 text-center font-semibold">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700 transition-colors"
            >
              +
            </button>
          </div>

          <div className="text-right">
            <p className="font-bold text-lg text-gray-800">₹{subtotal}</p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
