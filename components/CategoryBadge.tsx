import Link from 'next/link'
import { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category;
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const color = category.metadata?.color || '#3B82F6';
  const name = category.metadata?.name || category.title;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors hover:opacity-80"
      style={{
        backgroundColor: color + '20',
        color: color,
        borderColor: color + '40',
        borderWidth: '1px'
      }}
    >
      {name}
    </Link>
  )
}