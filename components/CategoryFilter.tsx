'use client'

import { useState } from 'react'
import { Category } from '../types'

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory?: string | null
  onCategoryChange?: (categorySlug: string | null) => void
}

export default function CategoryFilter({ categories, selectedCategory = null, onCategoryChange }: CategoryFilterProps) {
  const [localSelected, setLocalSelected] = useState<string | null>(selectedCategory)
  
  const handleCategoryChange = (categorySlug: string | null) => {
    setLocalSelected(categorySlug)
    onCategoryChange?.(categorySlug)
  }

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <button
        onClick={() => handleCategoryChange(null)}
        className={`px-4 py-2 rounded-full font-medium transition-colors ${
          localSelected === null
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
            localSelected === category.slug
              ? 'text-white'
              : 'text-gray-700 hover:opacity-80'
          }`}
          style={{
            backgroundColor: localSelected === category.slug 
              ? category.metadata.color 
              : '#f3f4f6',
            color: localSelected === category.slug ? 'white' : category.metadata.color
          }}
        >
          {category.metadata.name}
        </button>
      ))}
    </div>
  )
}