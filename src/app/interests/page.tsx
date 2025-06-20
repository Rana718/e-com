"use client"

import { useState, useEffect } from 'react'
import { useSession,  } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Save, ChevronLeft, ChevronRight } from 'lucide-react'
import { trpc } from '@/components/providers/trpc-provider'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export default function InterestsPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedInterests, setSelectedInterests] = useState<string[]>([])
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/signin')
        }
    }, [status, router])

    // Fetch categories with pagination
    const { data: categoriesData, isLoading: categoriesLoading } = trpc.categories.list.useQuery({
        page: currentPage,
        limit: 6,
    })

    // Fetch user's current interests
    const { data: userInterests, isLoading: interestsLoading } = trpc.categories.getUserInterests.useQuery(
        undefined,
        {
            enabled: !!session?.user,
        }
    )

    const saveInterestsMutation = trpc.categories.saveUserInterests.useMutation({
        onSuccess: () => {
            toast.success('Interests saved successfully!')
            setHasUnsavedChanges(false)
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to save interests')
        },
    })

    useEffect(() => {
        if (userInterests?.interests) {
            setSelectedInterests(userInterests.interests.map(interest => interest.id))
        }
    }, [userInterests])

    const handleInterestToggle = (categoryId: string) => {
        setSelectedInterests(prev => {
            const newInterests = prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
            
            setHasUnsavedChanges(true)
            return newInterests
        })
    }

    const handleSaveInterests = () => {
        saveInterestsMutation.mutate({
            categoryIds: selectedInterests,
        })
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    if (status === 'loading' || categoriesLoading || interestsLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    if (!session) {
        return null
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-4">
            <div className="max-w-4xl mx-auto">                {/* Header */}
                <Card className="mb-6">
                    <CardHeader>
                        <div className="text-center sm:text-left">
                            <CardTitle className="text-2xl sm:text-3xl">Your Interests</CardTitle>
                            <p className="text-sm sm:text-base text-muted-foreground mt-2">
                                Choose categories that interest you to get personalized recommendations
                            </p>
                        </div>
                    </CardHeader>
                </Card>

                {/* Interests Selection */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Select Your Interests</CardTitle>
                        <div className="text-sm text-muted-foreground">
                            {selectedInterests.length} selected
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                            {categoriesData?.categories.map((category, index) => (
                                <motion.div
                                    key={category.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <Card className="p-3 sm:p-4 cursor-pointer hover:bg-accent hover:shadow-md transition-all duration-200 border-2 hover:border-primary/50">
                                        <div className="flex items-center space-x-2 sm:space-x-3">
                                            <Checkbox
                                                id={category.id}
                                                checked={selectedInterests.includes(category.id)}
                                                onCheckedChange={() => handleInterestToggle(category.id)}
                                                className="flex-shrink-0"
                                            />
                                            <Label
                                                htmlFor={category.id}
                                                className="cursor-pointer flex-1 text-sm sm:text-base font-medium leading-tight"
                                            >
                                                {category.name}
                                            </Label>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>                        {/* Pagination */}
                        {categoriesData && categoriesData.pagination.totalPages > 1 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between pt-4 space-y-4 sm:space-y-0">
                                <div className="text-xs sm:text-sm text-muted-foreground order-2 sm:order-1">
                                    Showing {((currentPage - 1) * 6) + 1} to{' '}
                                    {Math.min(currentPage * 6, categoriesData.pagination.total)} of{' '}
                                    {categoriesData.pagination.total} categories
                                </div>
                                
                                <div className="flex items-center space-x-2 order-1 sm:order-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={!categoriesData.pagination.hasPreviousPage}
                                        className="flex items-center space-x-1"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        <span className="hidden sm:inline">Previous</span>
                                    </Button>
                                    
                                    <span className="text-xs sm:text-sm font-medium px-2">
                                        {currentPage} / {categoriesData.pagination.totalPages}
                                    </span>
                                    
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={!categoriesData.pagination.hasNextPage}
                                        className="flex items-center space-x-1"
                                    >
                                        <span className="hidden sm:inline">Next</span>
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Save Button */}
                        <div className="flex justify-center pt-4">
                            <Button
                                onClick={handleSaveInterests}
                                disabled={!hasUnsavedChanges || saveInterestsMutation.isPending}
                                className="flex items-center space-x-2"
                                size="lg"
                            >
                                <Save className="h-4 w-4" />
                                <span>
                                    {saveInterestsMutation.isPending 
                                        ? 'Saving...' 
                                        : hasUnsavedChanges 
                                            ? 'Save Changes' 
                                            : 'Saved'}
                                </span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
