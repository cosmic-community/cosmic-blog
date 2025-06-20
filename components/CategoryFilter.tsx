import Link from 'next/link'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => {
          const color = category.metadata?.color || '#3B82F6';
          const name = category.metadata?.name || category.title;
          
          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: color }}
              />
              <div className="flex-1">
                <span className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                  {name}
                </span>
                {category.metadata?.description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {category.metadata.description}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  )
}