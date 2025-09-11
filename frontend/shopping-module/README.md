# Waste Utilities Shopping App

A complete ReactJS shopping application for waste management utilities with Minecoins reward system.

## Features

- 🛒 **Product Catalog**: Browse waste utility products with category filtering
- 🛍️ **Shopping Cart**: Add, remove, and update quantities
- ⭐ **Minecoins System**: Earn 1 coin per ₹10 spent with transaction history
- 📱 **Responsive Design**: Mobile-friendly, portrait-optimized layout
- 💾 **Persistent Storage**: LocalStorage + optional Express.js backend
- 🎨 **Modern UI**: Clean design with Tailwind CSS

## Tech Stack

- **Frontend**: React 18, React Router, Tailwind CSS
- **Backend**: Express.js, CORS, File-based JSON storage
- **State Management**: React Context API
- **Storage**: LocalStorage (frontend) + JSON files (backend)

## Quick Start

### Frontend Only (LocalStorage)

```bash
# Install dependencies
npm install

# Start development server
npm start
```

### With Backend

```bash
# Start backend (Terminal 1)
cd backend
npm install
npm run dev

# Start frontend (Terminal 2)
npm start
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js       # Navigation with Minecoins display
│   ├── ProductCard.js  # Individual product display
│   ├── ProductGrid.js  # Product listing grid
│   ├── CartItem.js     # Cart item with quantity controls
│   ├── CartSummary.js  # Order summary and checkout
│   └── CoinsDisplay.js # Minecoins balance and history
├── pages/              # Main application pages
│   ├── Home.js         # Product listing with filters
│   └── Cart.js         # Shopping cart and checkout
├── context/            # React Context providers
│   ├── CartContext.js  # Cart state management
│   └── CoinsContext.js # Minecoins state management
├── data/               # Static data
│   └── products.js     # Product catalog
├── services/           # API integration
│   └── api.js          # Backend API calls
└── App.js              # Main application component

backend/
├── server.js           # Express.js API server
├── data/               # JSON data storage
│   ├── products.json   # Product inventory
│   ├── carts.json      # User shopping carts
│   └── orders.json     # Order history
└── package.json        # Backend dependencies
```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart/:userId` - Add item to cart
- `PUT /api/cart/:userId/:productId` - Update item quantity
- `DELETE /api/cart/:userId/:productId` - Remove item
- `POST /api/checkout/:userId` - Process checkout
- `GET /api/orders/:userId` - Get user's orders

## Environment Variables

Create `.env` file in root:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Minecoins System

- Earn 1 Minecoin per ₹10 spent
- View transaction history in navbar dropdown
- Persistent storage across sessions
- Visual notifications for earned coins

## Responsive Design

- Mobile-first approach
- Portrait-optimized layouts
- Touch-friendly controls
- Responsive grid system (1-4 columns)

## Development

```bash
# Frontend development
npm start

# Backend development
cd backend
npm run dev

# Build for production
npm run build
```

## Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `build/` folder

### Backend (Heroku/Railway)
1. Set PORT environment variable
2. Deploy `backend/` folder
3. Update REACT_APP_API_URL

## License

MIT License - feel free to use for personal and commercial projects.
