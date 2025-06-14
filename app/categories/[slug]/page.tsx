import { getCategoryBySlug, getPostsByCategory } from '@/lib/api'
import PostCard from '@/components/PostCard'
import type { Category, Post } from '@/types'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  
  try {
    const [category, posts]: [Category, Post[]] = await Promise.all([
      getCategoryBySlug(slug),
      getPostsByCategory(slug)
    ])

    if (!category) {
      notFound()
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div
              className="w-6 h-6 rounded-full mr-3"
              style={{ backgroundColor: category.metadata.color }}
            />
            <h1 className="text-4xl font-bold text-gray-900">
              {category.metadata.name}
            </h1>
          </div>
          {category.metadata.description && (
            <p className="text-lg text-gray-600">
              {category.metadata.description}
            </p>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No posts found in this category.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Posts ({posts.length})
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error fetching category data:', error)
    notFound()
  }
}