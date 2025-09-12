"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { ShoppingCart, Coins, Plus, Minus, Trash2, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Product data
const products = [
  {
    id: 1,
    name: "Industrial Waste Bin",
    price: 550,
    category: "bins",
    image: "/industrial-waste-bin.jpg",
    description: "Heavy-duty waste bin for industrial use",
  },
  {
    id: 2,
    name: "Recycling Container",
    price: 149.99,
    category: "bins",
    image: "/recycling-container.png",
    description: "Multi-compartment recycling solution",
  },
  {
    id: 3,
    name: "Waste Compactor",
    price: 1299.99,
    category: "equipment",
    image: "/waste-compactor.png",
    description: "Efficient waste compression system",
  },
  {
    id: 4,
    name: "Safety Gloves",
    price: 24.99,
    category: "safety",
    image: "/safety-gloves.jpg",
    description: "Heavy-duty protective gloves",
  },
  {
    id: 5,
    name: "Hazmat Suit",
    price: 89.99,
    category: "safety",
    image: "/hazmat-suit.jpg",
    description: "Full body protection suit",
  },
  {
    id: 6,
    name: "Waste Sorting System",
    price: 2499.99,
    category: "equipment",
    image: "/waste-sorting-system.jpg",
    description: "Automated waste sorting solution",
  },
  {
    id: 7,
    name: "Compost Bin",
    price: 79.99,
    category: "bins",
    image: "/compost-bin.jpg",
    description: "Organic waste composting bin",
  },
  // {
  //   id: 8,  
  //   name: "Waste Collection Truck",
  //   price: 45000.0,
  //   category: "vehicles",
  //   image: "/waste-collection-truck.jpg",
  //   description: "Professional waste collection vehicle",
  // },
]

// Cart Context
const CartContext = createContext()
const CoinsContext = createContext()

// Cart Provider
function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const savedCart = localStorage.getItem("wasteUtilitiesCart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("wasteUtilitiesCart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Coins Provider
function CoinsProvider({ children }) {
  const [coins, setCoins] = useState(1000)
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const savedCoins = localStorage.getItem("wasteUtilitiesCoins")
    const savedTransactions = localStorage.getItem("wasteUtilitiesTransactions")
    if (savedCoins) {
      setCoins(Number.parseInt(savedCoins))
    }
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("wasteUtilitiesCoins", coins.toString())
  }, [coins])

  useEffect(() => {
    localStorage.setItem("wasteUtilitiesTransactions", JSON.stringify(transactions))
  }, [transactions])

  const earnCoins = (amount, description) => {
    setCoins((prev) => prev + amount)
    setTransactions((prev) => [
      {
        id: Date.now(),
        type: "earned",
        amount,
        description,
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ])
  }

  const spendCoins = (amount, description) => {
    if (coins >= amount) {
      setCoins((prev) => prev - amount)
      setTransactions((prev) => [
        {
          id: Date.now(),
          type: "spent",
          amount,
          description,
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ])
      return true
    }
    return false
  }

  return (
    <CoinsContext.Provider
      value={{
        coins,
        transactions,
        earnCoins,
        spendCoins,
      }}
    >
      {children}
    </CoinsContext.Provider>
  )
}

// Custom hooks
const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}

const useCoins = () => {
  const context = useContext(CoinsContext)
  if (!context) {
    throw new Error("useCoins must be used within CoinsProvider")
  }
  return context
}

// Navbar Component
function Navbar({ currentPage, setCurrentPage }) {
  const { getCartItemsCount } = useCart()
  const { coins } = useCoins()

  return (
    <nav className="bg-green-600 text-white p-2 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold" style={{cursor: "pointer"}}>Waste Utilities</h1>
          <div className="hidden md:flex space-x-4">
            <Button
              variant={currentPage === "home" ? "secondary" : "ghost"}
              onClick={() => setCurrentPage("home")}
              className="text-white hover:bg-green-700"
            >
              Home
            </Button>
            <Button
              variant={currentPage === "cart" ? "secondary" : "ghost"}
              onClick={() => setCurrentPage("cart")}
              className="text-white hover:bg-green-700"
            >
              Cart
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-green-700 px-3 py-1 rounded-full">
            <Coins className="h-4 w-4" />
            <span className="font-semibold">{coins}</span>
          </div>

          <Button
            variant="ghost"
            onClick={() => setCurrentPage("cart")}
            className="relative text-white hover:bg-green-700"
          >
            <ShoppingCart className="h-5 w-5" />
            {getCartItemsCount() > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">{getCartItemsCount()}</Badge>
            )}
          </Button>
        </div>
      </div>
    </nav>
  )
}

// Product Card Component
function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="p-4">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-2"
        />
        <CardTitle className="text-lg">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4 pt-0">
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <Badge variant="secondary" className="mb-2">
          {product.category}
        </Badge>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-xl font-bold text-green-600">Rs. {product.price.toFixed(0)}</span>
        <Button onClick={() => addToCart(product)} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-1" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

// Category Filter Component
function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const categories = [
    { value: "all", label: "All Products" },
    { value: "bins", label: "Bins" },
    { value: "equipment", label: "Equipment" },
    { value: "safety", label: "Safety" },
    { value: "vehicles", label: "Vehicles" },
  ]

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Filter className="h-5 w-5 text-gray-500 mt-2" />
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={selectedCategory === category.value ? "default" : "outline"}
          onClick={() => onCategoryChange(category.value)}
          className="text-sm"
        >
          {category.label}
        </Button>
      ))}
    </div>
  )
}

// Home Page Component
function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Professional Waste Management Solutions</h2>
        <p className="text-gray-600">Discover our comprehensive range of waste utility products and equipment</p>
      </div>

      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

// Cart Item Component
function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg">
      <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-16 h-16 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-600">Rs. {item.price.toFixed(0)} each</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{item.quantity}</span>
        <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-right">
        <p className="font-semibold">Rs. {(item.price * item.quantity).toFixed(2)}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Cart Page Component
function CartPage() {
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { earnCoins } = useCoins()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const handleCheckout = async () => {
    setIsCheckingOut(true)

    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Calculate coins earned (5% of total)
    const coinsEarned = Math.floor(getCartTotal() * 0.05)
    earnCoins(coinsEarned, `Purchase reward - Order total: $${getCartTotal().toFixed(2)}`)

    clearCart()
    setIsCheckingOut(false)
    setOrderComplete(true)

    // Reset order complete after 3 seconds
    setTimeout(() => setOrderComplete(false), 3000)
  }

  if (orderComplete) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="text-center p-8">
          <CardContent>
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Order Complete!</h2>
            <p className="text-gray-600 mb-4">Thank you for your purchase. You've earned Minecoins as a reward!</p>
            <Button onClick={() => setOrderComplete(false)} className="bg-green-600 hover:bg-green-700">
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="text-center p-8">
          <CardContent>
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
            <p className="text-gray-500">Add some products to get started!</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold text-green-600">Rs. {getCartTotal().toFixed(2)}</span>
          </div>
          <div className="flex space-x-4">
            <Button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {isCheckingOut ? "Processing..." : "Checkout"}
            </Button>
            <Button variant="outline" onClick={clearCart} disabled={isCheckingOut}>
              Clear Cart
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Earn {Math.floor(getCartTotal() * 0.05)} Minecoins with this purchase!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// Main App Component
export default function WasteUtilitiesApp() {
  const [currentPage, setCurrentPage] = useState("home")

  return (
    <CartProvider>
      <CoinsProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

          <main className="py-8">
            {currentPage === "home" && <HomePage />}
            {currentPage === "cart" && <CartPage />}
          </main>
        </div>
      </CoinsProvider>
    </CartProvider>
  )
}
