"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Grid3X3, Grid2X2, Star, Zap, Shield } from "lucide-react"

const laptops = [
  {
    id: 1,
    name: 'MacBook Pro 14"',
    price: "$1,299",
    originalPrice: "$1,999",
    rating: 4.8,
    condition: "Excellent",
    specs: "M1 Pro, 16GB RAM, 512GB SSD",
    image: "/macbook-pro.png",
  },
  {
    id: 2,
    name: "ThinkPad X1 Carbon",
    price: "$899",
    originalPrice: "$1,499",
    rating: 4.7,
    condition: "Very Good",
    specs: "Intel i7, 16GB RAM, 256GB SSD",
    image: "/thinkpad-laptop.jpg",
  },
  {
    id: 3,
    name: "Dell XPS 13",
    price: "$749",
    originalPrice: "$1,299",
    rating: 4.6,
    condition: "Good",
    specs: "Intel i5, 8GB RAM, 256GB SSD",
    image: "/dell-xps-laptop.jpg",
  },
  {
    id: 4,
    name: "Surface Laptop 4",
    price: "$649",
    originalPrice: "$1,199",
    rating: 4.5,
    condition: "Very Good",
    specs: "AMD Ryzen 5, 8GB RAM, 256GB SSD",
    image: "/surface-laptop.jpg",
  },
  {
    id: 5,
    name: "MacBook Air M2",
    price: "$999",
    originalPrice: "$1,499",
    rating: 4.9,
    condition: "Excellent",
    specs: "M2 Chip, 8GB RAM, 256GB SSD",
    image: "/macbook-air-laptop.jpg",
  },
  {
    id: 6,
    name: "HP Spectre x360",
    price: "$799",
    originalPrice: "$1,399",
    rating: 4.4,
    condition: "Good",
    specs: "Intel i7, 16GB RAM, 512GB SSD",
    image: "/hp-spectre-laptop.jpg",
  },
  {
    id: 7,
    name: "ASUS ZenBook 14",
    price: "$599",
    originalPrice: "$999",
    rating: 4.3,
    condition: "Very Good",
    specs: "AMD Ryzen 7, 8GB RAM, 512GB SSD",
    image: "/asus-zenbook-laptop.jpg",
  },
  {
    id: 8,
    name: "Lenovo Yoga 9i",
    price: "$1,099",
    originalPrice: "$1,699",
    rating: 4.6,
    condition: "Excellent",
    specs: "Intel i7, 16GB RAM, 1TB SSD",
    image: "/lenovo-yoga-laptop.jpg",
  },
  {
    id: 9,
    name: "Framework Laptop",
    price: "$849",
    originalPrice: "$1,299",
    rating: 4.7,
    condition: "Very Good",
    specs: "Intel i5, 16GB RAM, 256GB SSD",
    image: "/framework-modular-laptop.jpg",
  },
  {
    id: 10,
    name: "Razer Blade 14",
    price: "$1,499",
    originalPrice: "$2,299",
    rating: 4.5,
    condition: "Good",
    specs: "AMD Ryzen 9, 16GB RAM, 1TB SSD",
    image: "/razer-blade-gaming-laptop.jpg",
  },
  {
    id: 11,
    name: "MSI Creator 15",
    price: "$1,199",
    originalPrice: "$1,899",
    rating: 4.4,
    condition: "Very Good",
    specs: "Intel i7, 32GB RAM, 1TB SSD",
    image: "/msi-creator-laptop.jpg",
  },
  {
    id: 12,
    name: "Acer Swift 3",
    price: "$449",
    originalPrice: "$799",
    rating: 4.2,
    condition: "Good",
    specs: "AMD Ryzen 5, 8GB RAM, 256GB SSD",
    image: "/acer-swift-laptop.jpg",
  },
  {
    id: 13,
    name: "Google Pixelbook Go",
    price: "$399",
    originalPrice: "$649",
    rating: 4.3,
    condition: "Very Good",
    specs: "Intel i5, 8GB RAM, 128GB SSD",
    image: "/google-pixelbook-laptop.jpg",
  },
  {
    id: 14,
    name: "Samsung Galaxy Book3",
    price: "$699",
    originalPrice: "$1,199",
    rating: 4.5,
    condition: "Excellent",
    specs: "Intel i7, 16GB RAM, 512GB SSD",
    image: "/samsung-galaxy-book-laptop.jpg",
  },
  {
    id: 15,
    name: "Alienware m15 R7",
    price: "$1,799",
    originalPrice: "$2,699",
    rating: 4.6,
    condition: "Very Good",
    specs: "Intel i9, 32GB RAM, 1TB SSD",
    image: "/alienware-gaming-laptop.jpg",
  },
  {
    id: 16,
    name: "System76 Lemur Pro",
    price: "$899",
    originalPrice: "$1,399",
    rating: 4.4,
    condition: "Good",
    specs: "Intel i7, 16GB RAM, 500GB SSD",
    image: "/system76-linux-laptop.jpg",
  },
]

export function MarketplaceSection() {
  const [gridSize, setGridSize] = useState<"3x3" | "4x4">("3x3")

  const displayedLaptops = gridSize === "3x3" ? laptops.slice(0, 9) : laptops.slice(0, 16)
  const gridCols =
    gridSize === "3x3"
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Certified Refurbished Laptops
          </h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Premium quality laptops, thoroughly tested and certified for performance and reliability
          </p>
        </div>

        {/* Grid Toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2 bg-background rounded-xl p-1 border">
            <Button
              variant={gridSize === "3x3" ? "default" : "ghost"}
              size="sm"
              onClick={() => setGridSize("3x3")}
              className="rounded-lg"
            >
              <Grid3X3 className="w-4 h-4 mr-2" />
              3×3 Grid
            </Button>
            <Button
              variant={gridSize === "4x4" ? "default" : "ghost"}
              size="sm"
              onClick={() => setGridSize("4x4")}
              className="rounded-lg"
            >
              <Grid2X2 className="w-4 h-4 mr-2" />
              4×4 Grid
            </Button>
          </div>
        </div>

        {/* Laptop Grid */}
        <div className={`grid ${gridCols} gap-6`}>
          {displayedLaptops.map((laptop, index) => (
            <Card
              key={laptop.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-2xl overflow-hidden border-0 bg-card/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={laptop.image || "/placeholder.svg"}
                    alt={laptop.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                      <Shield className="w-3 h-3 mr-1" />
                      Certified
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" className="bg-background/90">
                      {laptop.condition}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-2">{laptop.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{laptop.specs}</p>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium ml-1">{laptop.rating}</span>
                    </div>
                    <div className="ml-auto flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground line-through">{laptop.originalPrice}</span>
                      <span className="text-lg font-bold text-primary">{laptop.price}</span>
                    </div>
                  </div>

                  <Button className="w-full rounded-xl group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Zap className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
