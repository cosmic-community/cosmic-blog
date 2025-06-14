import { getAllPosts, getFeaturedPosts, getAllCategories } from '@/lib/api'
import PostCard from '@/components/PostCard'
import FeaturedPost from '@/components/FeaturedPost'
import CategoryFilter from '@/components/CategoryFilter'
import type { Post, Category } from '@/types'

export default async function HomePage() {
  const [posts, featuredPosts, categories] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(),
    getAllCategories()
  ])

  const mainFeatured = featuredPosts[0]
  const otherFeatured = featuredPosts.slice(1)

  if (!posts.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Cosmic Blog</h1>
          <p className="text-gray-600">No posts found. Please add some content to your Cosmic bucket.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Featured Post */}
      {mainFeatured && (
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Latest Stories</h1>
          <FeaturedPost post={mainFeatured} />
        </section>
      )}

      {/* Category Filter */}
      <section className="mb-8">
        <CategoryFilter categories={categories} />
      </section>

      {/* Other Featured Posts */}
      {otherFeatured.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Posts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {otherFeatured.map((post) => (
              <PostCard key={post.id} post={post} featured={true} />
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Posts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}