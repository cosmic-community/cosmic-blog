import Link from 'next/link'
import { Category } from '../types'

interface CategoryBadgeProps {
  category: Category
  variant?: 'default' | 'light'
  linkable?: boolean
}

export default function CategoryBadge({ 
  category, 
  variant = 'default', 
  linkable = true 
}: CategoryBadgeProps) {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors"
  
  const variantClasses = variant === 'light' 
    ? "bg-white/20 text-white hover:bg-white/30" 
    : "text-white hover:opacity-80"

  const badgeContent = (
    <span 
      className={`${baseClasses} ${variantClasses}`}
      style={{ 
        backgroundColor: variant === 'default' ? category.metadata.color : undefined 
      }}
    >
      {category.metadata.name}
    </span>
  )

  if (linkable) {
    return (
      <Link href={`/categories/${category.slug}`}>
        {badgeContent}
      </Link>
    )
  }

  return badgeContent
}