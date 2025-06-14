'use client'

import { useState } from 'react'
import { Category } from '../types'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleCategoryChange = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug)
    // In a real implementation, you would filter posts here
    // For now, this is just visual feedback
  }

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <button
        onClick={() => handleCategoryChange(null)}
        className={`px-4 py-2 rounded-full font-medium transition-colors ${
          selectedCategory === null
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Posts
      </button>
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.slug)}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            selectedCategory === category.slug
              ? 'text-white'
              : 'text-gray-700 hover:opacity-80'
          }`}
          style={{
            backgroundColor: selectedCategory === category.slug 
              ? category.metadata.color 
              : '#f3f4f6',
            color: selectedCategory === category.slug ? 'white' : category.metadata.color
          }}
        >
          {category.metadata.name}
        </button>
      ))}
    </div>
  )
}