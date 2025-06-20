// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PostCard from '@/components/PostCard'
import CategoryBadge from '@/components/CategoryBadge'
import { Category, Post } from '@/types'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug) as Category | null;

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.metadata?.name || category.title} - Cosmic Blog`,
    description: category.metadata?.description || `Posts in the ${category.metadata?.name || category.title} category`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  const [category, posts] = await Promise.all([
    getCategoryBySlug(slug),
    getCategoryBySlug(slug).then(async (category) => {
      if (category) {
        return getPostsByCategory(category.id);
      }
      return [];
    })
  ]) as [Category | null, Post[]];

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <CategoryBadge category={category} />
            <h1 className="text-3xl font-bold text-gray-900">
              {category.metadata?.name || category.title}
            </h1>
          </div>
          {category.metadata?.description && (
            <p className="text-gray-600 text-lg">
              {category.metadata.description}
            </p>
          )}
        </div>

        {/* Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No posts found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}