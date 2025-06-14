'use client'

import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string | null
  onCategoryChange: (categoryId: string | null) => void
}

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 rounded-full font-medium transition-colors ${
          selectedCategory === null
            ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        All Posts
      </button>
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            selectedCategory === category.id
              ? 'text-white'
              : 'text-gray-700 dark:text-gray-300 hover:opacity-80'
          }`}
          style={{
            backgroundColor: selectedCategory === category.id 
              ? category.metadata.color 
              : 'rgb(243 244 246)',
            color: selectedCategory === category.id ? 'white' : category.metadata.color
          }}
        >
          {category.metadata.name}
        </button>
      ))}
    </div>
  )
}