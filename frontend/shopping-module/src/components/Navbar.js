import { Link, useLocation } from "react-router-dom"
import { useCart } from "../context/CartContext"
import CoinsDisplay from "./CoinsDisplay"

const Navbar = () => {
  const location = useLocation()
  const { cartItems } = useCart()

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            🗂️ Waste Utilities
          </Link>

          <div className="flex items-center space-x-6">
            <CoinsDisplay />

            <Link
              to="/"
              className={`px-3 py-2 rounded-md transition-colors ${
                location.pathname === "/" ? "bg-green-700 text-white" : "text-green-100 hover:bg-green-700"
              }`}
            >
              Home
            </Link>

            <Link
              to="/cart"
              className={`px-3 py-2 rounded-md transition-colors relative ${
                location.pathname === "/cart" ? "bg-green-700 text-white" : "text-green-100 hover:bg-green-700"
              }`}
            >
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
