"use client"

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User, Mail, Phone, MapPin, Camera, Save, Edit, Shield, Bell, Eye, EyeOff, LogOut } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function ProfilePage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        bio: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/signin')
        }
    }, [status, router])

    useEffect(() => {
        if (session?.user) {
            setFormData(prev => ({
                ...prev,
                name: session.user.name || '',
                email: session.user.email || ''
            }))
        }
    }, [session])

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

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSave = () => {
        console.log('Saving profile...', formData)
        setIsEditing(false)
    }

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/signin' })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto px-4 py-6 lg:py-8">
                {/* Header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Profile Settings
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage your account information and preferences
                        </p>
                    </div>
                    <Button
                        variant="destructive"
                        onClick={handleSignOut}
                        className="w-full sm:w-auto"
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Overview */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader className="text-center">
                                <div className="relative mx-auto mb-4">
                                    <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                                        <User className="h-16 w-16 text-primary" />
                                    </div>
                                    <Button
                                        size="sm"
                                        className="absolute bottom-0 right-0 rounded-full p-2"
                                    >
                                        <Camera className="h-4 w-4" />
                                    </Button>
                                </div>
                                <CardTitle className="text-xl">{session.user?.name}</CardTitle>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {session.user?.email}
                                </p>
                                <div className="flex justify-center mt-4">
                                    <Badge variant="secondary">
                                        Member since Jan 2024
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Status</span>
                                        <Badge variant="default">Active</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Orders</span>
                                        <span className="font-medium">24</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Interests</span>
                                        <span className="font-medium">8 categories</span>
                                    </div>
                                </div>

                                {/* Sign Out Button for Mobile */}
                                <div className="mt-6 lg:hidden">
                                    <Button
                                        variant="destructive"
                                        onClick={handleSignOut}
                                        className="w-full"
                                    >
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Sign Out
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Profile Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Information */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="flex items-center">
                                    <User className="h-5 w-5 mr-2" />
                                    Personal Information
                                </CardTitle>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                >
                                    {isEditing ? (
                                        <>
                                            <Save className="h-4 w-4 mr-2" />
                                            Save
                                        </>
                                    ) : (
                                        <>
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit
                                        </>
                                    )}
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="name">Full Name</Label>
                                        <div className="relative mt-1">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                disabled={!isEditing}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email Address</Label>
                                        <div className="relative mt-1">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                disabled={!isEditing}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <div className="relative mt-1">
                                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="phone"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                disabled={!isEditing}
                                                className="pl-10"
                                                placeholder="Enter phone number"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="address">Address</Label>
                                        <div className="relative mt-1">
                                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="address"
                                                value={formData.address}
                                                onChange={(e) => handleInputChange('address', e.target.value)}
                                                disabled={!isEditing}
                                                className="pl-10"
                                                placeholder="Enter address"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="bio">Bio</Label>
                                    <textarea
                                        id="bio"
                                        value={formData.bio}
                                        onChange={(e) => handleInputChange('bio', e.target.value)}
                                        disabled={!isEditing}
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                                        rows={3}
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Account Security */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Shield className="h-5 w-5 mr-2" />
                                    Account Security
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="currentPassword">Current Password</Label>
                                    <div className="relative mt-1">
                                        <Input
                                            id="currentPassword"
                                            type={showPassword ? "text" : "password"}
                                            value={formData.currentPassword}
                                            onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                                            placeholder="Enter current password"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="newPassword">New Password</Label>
                                        <Input
                                            id="newPassword"
                                            type="password"
                                            value={formData.newPassword}
                                            onChange={(e) => handleInputChange('newPassword', e.target.value)}
                                            placeholder="Enter new password"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                            placeholder="Confirm new password"
                                            className="mt-1"
                                        />
                                    </div>
                                </div>

                                <Button variant="outline" className="w-full sm:w-auto">
                                    Update Password
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Notifications */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Bell className="h-5 w-5 mr-2" />
                                    Notification Preferences
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Email Notifications</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Receive updates about your orders and account
                                        </p>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        Enable
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">SMS Notifications</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Get text messages for important updates
                                        </p>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        Enable
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Marketing Communications</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Receive promotional offers and news
                                        </p>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        Disable
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}