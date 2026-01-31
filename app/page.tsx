import { getAllPosts, getFeaturedPosts, getAllCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import FeaturedPost from '@/components/FeaturedPost'
import CategoryBadge from '@/components/CategoryBadge'
import Link from 'next/link'

export default async function HomePage() {
  const [posts, featuredPosts, categories] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(),
    getAllCategories(),
  ])

  const mainFeatured = featuredPosts[0]
  const regularPosts = posts.filter(post => !post.metadata?.is_featured)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Featured Post */}
      {mainFeatured && (
        <section className="mb-16">
          <FeaturedPost post={mainFeatured} />
        </section>
      )}

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Browse by Category
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <CategoryBadge category={category} />
            </Link>
          ))}
        </div>
      </section>

      {/* All Posts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
        {regularPosts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {regularPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}