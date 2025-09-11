const express = require("express")
const cors = require("cors")
const fs = require("fs").promises
const path = require("path")

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Data file paths
const DATA_DIR = path.join(__dirname, "data")
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json")
const CARTS_FILE = path.join(DATA_DIR, "carts.json")
const ORDERS_FILE = path.join(DATA_DIR, "orders.json")

// Ensure data directory exists
const ensureDataDir = async () => {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

// Initialize data files
const initializeData = async () => {
  await ensureDataDir()

  // Initialize products
  const products = [
    {
      id: 1,
      title: "Premium Compost Kit",
      price: 299,
      image: "/placeholder.svg?height=200&width=200",
      description: "Complete composting solution with bin, starter mix, and guide",
      category: "composting",
      stock: 50,
    },
    {
      id: 2,
      title: "Stainless Steel Dustbin",
      price: 450,
      image: "/placeholder.svg?height=200&width=200",
      description: "Durable 20L capacity with pedal mechanism",
      category: "bins",
      stock: 30,
    },
    {
      id: 3,
      title: "Safety Gloves Set",
      price: 120,
      image: "/placeholder.svg?height=200&width=200",
      description: "Heavy-duty gloves for safe waste handling (Pack of 5)",
      category: "safety",
      stock: 100,
    },
    {
      id: 4,
      title: "3-Tier Recycling Bin",
      price: 680,
      image: "/placeholder.svg?height=200&width=200",
      description: "Separate compartments for plastic, paper, and metal",
      category: "recycling",
      stock: 25,
    },
    {
      id: 5,
      title: "Organic Waste Composter",
      price: 850,
      image: "/placeholder.svg?height=200&width=200",
      description: "Electric composter for kitchen waste processing",
      category: "composting",
      stock: 15,
    },
    {
      id: 6,
      title: "Biodegradable Trash Bags",
      price: 180,
      image: "/placeholder.svg?height=200&width=200",
      description: "Eco-friendly bags - 50 pieces per pack",
      category: "accessories",
      stock: 200,
    },
    {
      id: 7,
      title: "Wheeled Garbage Bin",
      price: 520,
      image: "/placeholder.svg?height=200&width=200",
      description: "120L capacity with wheels and secure lid",
      category: "bins",
      stock: 20,
    },
    {
      id: 8,
      title: "Hazmat Disposal Kit",
      price: 750,
      image: "/placeholder.svg?height=200&width=200",
      description: "Complete kit for safe hazardous waste disposal",
      category: "safety",
      stock: 10,
    },
  ]

  try {
    await fs.access(PRODUCTS_FILE)
  } catch {
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2))
  }

  try {
    await fs.access(CARTS_FILE)
  } catch {
    await fs.writeFile(CARTS_FILE, JSON.stringify({}, null, 2))
  }

  try {
    await fs.access(ORDERS_FILE)
  } catch {
    await fs.writeFile(ORDERS_FILE, JSON.stringify([], null, 2))
  }
}

// Helper functions
const readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error)
    return null
  }
}

const writeJsonFile = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error)
    return false
  }
}

// Routes

// GET /api/products - Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await readJsonFile(PRODUCTS_FILE)
    if (products) {
      res.json(products)
    } else {
      res.status(500).json({ error: "Failed to load products" })
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// GET /api/products/:id - Get single product
app.get("/api/products/:id", async (req, res) => {
  try {
    const products = await readJsonFile(PRODUCTS_FILE)
    const product = products.find((p) => p.id === Number.parseInt(req.params.id))

    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ error: "Product not found" })
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// GET /api/cart/:userId - Get user's cart
app.get("/api/cart/:userId", async (req, res) => {
  try {
    const carts = await readJsonFile(CARTS_FILE)
    const userCart = carts[req.params.userId] || []
    res.json(userCart)
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// POST /api/cart/:userId - Add item to cart
app.post("/api/cart/:userId", async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body
    const userId = req.params.userId

    const products = await readJsonFile(PRODUCTS_FILE)
    const product = products.find((p) => p.id === productId)

    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    const carts = await readJsonFile(CARTS_FILE)
    if (!carts[userId]) {
      carts[userId] = []
    }

    const existingItem = carts[userId].find((item) => item.id === productId)
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      carts[userId].push({ ...product, quantity })
    }

    const success = await writeJsonFile(CARTS_FILE, carts)
    if (success) {
      res.json({ message: "Item added to cart", cart: carts[userId] })
    } else {
      res.status(500).json({ error: "Failed to update cart" })
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// PUT /api/cart/:userId/:productId - Update item quantity
app.put("/api/cart/:userId/:productId", async (req, res) => {
  try {
    const { quantity } = req.body
    const userId = req.params.userId
    const productId = Number.parseInt(req.params.productId)

    const carts = await readJsonFile(CARTS_FILE)
    if (!carts[userId]) {
      return res.status(404).json({ error: "Cart not found" })
    }

    if (quantity <= 0) {
      carts[userId] = carts[userId].filter((item) => item.id !== productId)
    } else {
      const item = carts[userId].find((item) => item.id === productId)
      if (item) {
        item.quantity = quantity
      } else {
        return res.status(404).json({ error: "Item not found in cart" })
      }
    }

    const success = await writeJsonFile(CARTS_FILE, carts)
    if (success) {
      res.json({ message: "Cart updated", cart: carts[userId] })
    } else {
      res.status(500).json({ error: "Failed to update cart" })
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// DELETE /api/cart/:userId/:productId - Remove item from cart
app.delete("/api/cart/:userId/:productId", async (req, res) => {
  try {
    const userId = req.params.userId
    const productId = Number.parseInt(req.params.productId)

    const carts = await readJsonFile(CARTS_FILE)
    if (!carts[userId]) {
      return res.status(404).json({ error: "Cart not found" })
    }

    carts[userId] = carts[userId].filter((item) => item.id !== productId)

    const success = await writeJsonFile(CARTS_FILE, carts)
    if (success) {
      res.json({ message: "Item removed from cart", cart: carts[userId] })
    } else {
      res.status(500).json({ error: "Failed to update cart" })
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// POST /api/checkout/:userId - Process checkout
app.post("/api/checkout/:userId", async (req, res) => {
  try {
    const userId = req.params.userId
    const { customerInfo } = req.body

    const carts = await readJsonFile(CARTS_FILE)
    const userCart = carts[userId] || []

    if (userCart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" })
    }

    // Calculate total
    const total = userCart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const coinsEarned = Math.floor(total / 10)

    // Create order
    const order = {
      id: Date.now(),
      userId,
      items: userCart,
      total,
      coinsEarned,
      customerInfo: customerInfo || {},
      status: "completed",
      createdAt: new Date().toISOString(),
    }

    // Save order
    const orders = await readJsonFile(ORDERS_FILE)
    orders.push(order)
    await writeJsonFile(ORDERS_FILE, orders)

    // Clear cart
    carts[userId] = []
    await writeJsonFile(CARTS_FILE, carts)

    res.json({
      message: "Order completed successfully",
      order,
      coinsEarned,
    })
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// GET /api/orders/:userId - Get user's orders
app.get("/api/orders/:userId", async (req, res) => {
  try {
    const orders = await readJsonFile(ORDERS_FILE)
    const userOrders = orders.filter((order) => order.userId === req.params.userId)
    res.json(userOrders)
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// Initialize and start server
const startServer = async () => {
  await initializeData()
  app.listen(PORT, () => {
    console.log(`🚀 Waste Utilities Backend running on port ${PORT}`)
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api`)
  })
}

startServer().catch(console.error)
