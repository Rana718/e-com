import { PrismaClient } from '../src/generated/prisma'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting database seeding...')

    // Clear existing categories
    await prisma.category.deleteMany()
    console.log('🗑️  Cleared existing categories')

    // Generate 100 unique categories
    const categories: { name: string }[] = []
    const categoryNames = new Set<string>()

    // Create different types of categories
    const categoryTypes = [
        () => faker.commerce.department(),
        () => faker.commerce.productName(),
        () => faker.company.buzzNoun(),
        () => faker.hacker.noun(),
        () => faker.color.human(),
        () => faker.music.genre(),
        () => faker.vehicle.type(),
        () => faker.animal.type(),
        () => faker.food.spice(),
        () => faker.science.chemicalElement().name,
    ]

    while (categoryNames.size < 100) {
        const randomType = faker.helpers.arrayElement(categoryTypes)
        const categoryName = randomType()

        // Ensure uniqueness and proper formatting
        const formattedName = categoryName
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')

        if (!categoryNames.has(formattedName) && formattedName.length > 2) {
            categoryNames.add(formattedName)
            categories.push({ name: formattedName })
        }
    }

    // Insert categories in batches
    const batchSize = 20
    for (let i = 0; i < categories.length; i += batchSize) {
        const batch = categories.slice(i, i + batchSize)
        await prisma.category.createMany({
            data: batch,
            skipDuplicates: true,
        })
        console.log(`📦 Inserted categories ${i + 1}-${Math.min(i + batchSize, categories.length)}`)
    }

    const totalCategories = await prisma.category.count()
    console.log(`✅ Successfully seeded ${totalCategories} categories`)
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
