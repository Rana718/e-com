"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import {
    ShoppingBag,
    Heart,
    User,
    Settings,
    TrendingUp,
    Package,
    Star,
    ArrowRight,
    Eye,
    Calendar,
    CreditCard,
    Gift
} from 'lucide-react'

const DashboardPage = () => {
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

    const quickActions = [
        { icon: ShoppingBag, label: 'Browse Products', href: '/products', color: 'bg-blue-500' },
        { icon: Heart, label: 'My Wishlist', href: '/wishlist', color: 'bg-red-500' },
        { icon: Package, label: 'Order History', href: '/orders', color: 'bg-green-500' },
        { icon: Settings, label: 'Account Settings', href: '/profile', color: 'bg-purple-500' },
    ]

    const stats = [
        { label: 'Total Orders', value: '24', icon: Package, trend: '+12%' },
        { label: 'Wishlist Items', value: '8', icon: Heart, trend: '+3' },
        { label: 'Total Spent', value: '$1,234', icon: CreditCard, trend: '+$89' },
        { label: 'Rewards Points', value: '2,450', icon: Star, trend: '+150' },
    ]

    const recentOrders = [
        { id: '1', date: '2024-01-15', status: 'Delivered', total: '$89.99', items: 3 },
        { id: '2', date: '2024-01-10', status: 'Shipped', total: '$156.50', items: 2 },
        { id: '3', date: '2024-01-05', status: 'Processing', total: '$45.00', items: 1 },
    ]

    const recommendations = [
        { name: 'Wireless Headphones', price: '$99.99', rating: 4.5, image: '🎧' },
        { name: 'Smart Watch', price: '$299.99', rating: 4.8, image: '⌚' },
        { name: 'Laptop Stand', price: '$49.99', rating: 4.3, image: '💻' },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto px-4 py-6 lg:py-8">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Welcome back, {session.user?.name}! 👋
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Here&apos;s what&apos;s happening with your account today.
                            </p>
                        </div>
                        <Button
                            onClick={() => router.push('/products')}
                            className="w-full sm:w-auto"
                        >
                            Start Shopping
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                </motion.div>

                {/* Stats Overview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                >
                    {stats.map((stat, index) => (
                        <Card key={index} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            {stat.label}
                                        </p>
                                        <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                            {stat.value}
                                        </p>
                                        <p className="text-sm text-green-600 dark:text-green-400">
                                            {stat.trend}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <stat.icon className="h-6 w-6 text-primary" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {quickActions.map((action, index) => (
                            <Card
                                key={index}
                                className="hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105"
                                onClick={() => router.push(action.href)}
                            >
                                <CardContent className="p-4 sm:p-6 text-center">
                                    <div className={`${action.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                                        <action.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                                        {action.label}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Orders */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="flex items-center">
                                    <Package className="h-5 w-5 mr-2" />
                                    Recent Orders
                                </CardTitle>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.push('/orders')}
                                >
                                    View All
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentOrders.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium text-sm">Order #{order.id}</span>
                                                    <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                                                        {order.status}
                                                    </Badge>
                                                </div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    {order.date} • {order.items} items
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold">{order.total}</p>
                                                <Button variant="ghost" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Recommendations */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <TrendingUp className="h-5 w-5 mr-2" />
                                    Recommended for You
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recommendations.map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                                            <div className="text-2xl">{item.image}</div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-sm">{item.name}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="font-semibold text-primary">{item.price}</span>
                                                    <div className="flex items-center">
                                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                        <span className="text-xs ml-1">{item.rating}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button size="sm" variant="outline">
                                                Add to Cart
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Additional Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Loyalty Program */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Gift className="h-5 w-5 mr-2" />
                                    Loyalty Rewards
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4">
                                    <p className="text-lg font-semibold">2,450 Points Available</p>
                                    <p className="text-sm opacity-90">Next reward at 3,000 points</p>
                                </div>
                                <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                                    <div className="bg-white h-2 rounded-full" style={{ width: '82%' }}></div>
                                </div>
                                <Button variant="secondary" size="sm" className="text-purple-600">
                                    Redeem Points
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Account Health */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <User className="h-5 w-5 mr-2" />
                                    Account Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Profile Completion</span>
                                        <Badge variant="default">85%</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Email Verified</span>
                                        <Badge variant="default">✓</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Phone Verified</span>
                                        <Badge variant="outline">Pending</Badge>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full mt-4"
                                    onClick={() => router.push('/profile')}
                                >
                                    Complete Profile
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage