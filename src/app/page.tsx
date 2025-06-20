"use client"

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingBag, Users, Heart, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Discover Your Interests
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users in exploring and selecting your favorite categories. 
              Build your personalized interest profile and discover what matters to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!session && (
                <>
                  <Button size="lg" asChild>
                    <Link href="/register">Start Your Journey</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/signin">Already a member?</Link>
                  </Button>
                </>
              )}
              {session && (
                <Button size="lg" asChild>
                  <Link href="/interests">Explore Categories</Link>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose InterestShop?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover, explore, and curate your personal interests with our intuitive platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="text-center h-full">
                <CardHeader>
                  <Users className="h-12 w-12 mx-auto text-primary mb-4" />
                  <CardTitle>100+ Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Choose from over 100 carefully curated categories across various domains
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="text-center h-full">
                <CardHeader>
                  <Heart className="h-12 w-12 mx-auto text-primary mb-4" />
                  <CardTitle>Personalized</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Build your unique profile by selecting interests that truly resonate with you
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="text-center h-full">
                <CardHeader>
                  <TrendingUp className="h-12 w-12 mx-auto text-primary mb-4" />
                  <CardTitle>Smart Pagination</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Browse through categories with ease using our intelligent pagination system
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="text-center h-full">
                <CardHeader>
                  <ShoppingBag className="h-12 w-12 mx-auto text-primary mb-4" />
                  <CardTitle>Secure & Fast</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your data is secure with our modern authentication and fast performance
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <ShoppingBag className="h-6 w-6" />
              <span className="text-xl font-bold">InterestShop</span>
            </div>
            <p className="text-slate-400 mb-4">
              Discover your interests, build your profile, explore new possibilities.
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/register" className="text-slate-400 hover:text-white transition-colors">
                Get Started
              </Link>
              <Link href="/signin" className="text-slate-400 hover:text-white transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
