"use client"

import { useState, useMemo } from "react"
import { products } from "../data/products"
import ProductGrid from "../components/ProductGrid"
import CategoryFilter from "../components/CategoryFilter"

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Get unique categories from products
  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))]
  }, [])

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") {
      return products
    }
    return products.filter((product) => product.category === selectedCategory)
  }, [selectedCategory])

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Waste Utilities Store</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Eco-friendly solutions for waste management. Build a sustainable future with our premium products.
        </p>
      </div>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Products Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          {selectedCategory !== "all" && ` in "${selectedCategory}"`}
        </p>
      </div>

      {/* Product Grid */}
      <ProductGrid products={filteredProducts} />

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  )
}

export default Home
