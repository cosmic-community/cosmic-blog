import { getAllCategories } from '@/lib/api'
import Link from 'next/link'
import type { Category } from '@/types'

export default async function CategoriesPage() {
  const categories: Category[] = await getAllCategories()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Categories</h1>
      
      {categories.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">No categories found.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <div
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: category.metadata.color }}
                />
                <h2 className="text-xl font-semibold text-gray-900">
                  {category.metadata.name}
                </h2>
              </div>
              {category.metadata.description && (
                <p className="text-gray-600 text-sm">
                  {category.metadata.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}