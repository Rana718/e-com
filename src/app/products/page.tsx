"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ShoppingBag, 
  Package, 
  Star, 
  Filter,
  Grid,
  List,
  Search,
  Heart,
  ShoppingCart
} from 'lucide-react'

export default function ProductsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  // Mock products data
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 299.99,
      rating: 4.5,
      image: "/api/placeholder/300/300",
      category: "Electronics",
      description: "High-quality wireless headphones with noise cancellation"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      rating: 4.2,
      image: "/api/placeholder/300/300",
      category: "Electronics",
      description: "Feature-rich smartwatch with health tracking"
    },
    {
      id: 3,
      name: "Coffee Maker",
      price: 89.99,
      rating: 4.7,
      image: "/api/placeholder/300/300",
      category: "Home & Kitchen",
      description: "Automatic coffee maker with programmable settings"
    },
    {
      id: 4,
      name: "Yoga Mat",
      price: 39.99,
      rating: 4.3,
      image: "/api/placeholder/300/300",
      category: "Sports & Fitness",
      description: "Premium yoga mat with excellent grip"
    },
    {
      id: 5,
      name: "Bluetooth Speaker",
      price: 79.99,
      rating: 4.4,
      image: "/api/placeholder/300/300",
      category: "Electronics",
      description: "Portable bluetooth speaker with rich sound"
    },
    {
      id: 6,
      name: "Running Shoes",
      price: 129.99,
      rating: 4.6,
      image: "/api/placeholder/300/300",
      category: "Sports & Fitness",
      description: "Comfortable running shoes for all terrains"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Products
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Discover products tailored to your interests
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Package className="h-16 w-16 text-gray-400" />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 p-2 hover:bg-white/80"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
                
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-primary">
                    ${product.price}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>
                
                <Button className="w-full" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-8">
          <Button variant="outline">
            Load More Products
          </Button>
        </div>
      </div>
    </div>
  )
}
