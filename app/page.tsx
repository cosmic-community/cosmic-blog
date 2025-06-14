'use client'

import { useEffect, useState } from 'react'
import { getAllPosts, getFeaturedPosts, getAllCategories } from '@/lib/api'
import PostCard from '@/components/PostCard'
import FeaturedPost from '@/components/FeaturedPost'
import CategoryFilter from '@/components/CategoryFilter'
import type { Post, Category } from '@/types'

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsData, featuredData, categoriesData] = await Promise.all([
          getAllPosts(),
          getFeaturedPosts(),
          getAllCategories()
        ])
        
        setPosts(postsData)
        setFeaturedPosts(featuredData)
        setCategories(categoriesData)
        setFilteredPosts(postsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleCategoryChange = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug)
    if (categorySlug === null) {
      setFilteredPosts(posts)
    } else {
      const filtered = posts.filter(post => 
        post.metadata.category?.slug === categorySlug
      )
      setFilteredPosts(filtered)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

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

  const mainFeatured = featuredPosts[0]
  const otherFeatured = featuredPosts.slice(1)

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
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </section>

      {/* Other Featured Posts */}
      {otherFeatured.length > 0 && selectedCategory === null && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Posts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {otherFeatured.map((post) => (
              <PostCard key={post.id} post={post} featured={true} />
            ))}
          </div>
        </section>
      )}

      {/* Filtered Posts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {selectedCategory ? `Posts in ${categories.find(c => c.slug === selectedCategory)?.metadata.name}` : 'All Posts'}
        </h2>
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">
            No posts found in this category.
          </p>
        )}
      </section>
    </div>
  )
}