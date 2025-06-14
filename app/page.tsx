import { getAllPosts, getFeaturedPosts, getAllCategories } from '@/lib/api'
import BlogContent from '@/components/BlogContent'
import type { Post, Category } from '@/types'

export default async function HomePage() {
  const [posts, featuredPosts, categories] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(),
    getAllCategories()
  ])

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
      <BlogContent 
        posts={posts} 
        featuredPosts={featuredPosts} 
        categories={categories} 
      />
    </div>
  )
}