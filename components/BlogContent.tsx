'use client'

import { useState } from 'react'
import PostCard from './PostCard'
import FeaturedPost from './FeaturedPost'
import CategoryFilter from './CategoryFilter'
import type { Post, Category } from '@/types'

interface BlogContentProps {
  posts: Post[]
  featuredPosts: Post[]
  categories: Category[]
}

export default function BlogContent({ posts, featuredPosts, categories }: BlogContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter posts based on selected category
  const filteredPosts = selectedCategory 
    ? posts.filter(post => post.metadata.category?.id === selectedCategory)
    : posts

  // Filter featured posts based on selected category
  const filteredFeaturedPosts = selectedCategory
    ? featuredPosts.filter(post => post.metadata.category?.id === selectedCategory)
    : featuredPosts

  const mainFeatured = filteredFeaturedPosts[0]
  const otherFeatured = filteredFeaturedPosts.slice(1)

  return (
    <>
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
          onCategoryChange={setSelectedCategory}
        />
      </section>

      {/* Other Featured Posts */}
      {otherFeatured.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedCategory ? 'Featured Posts in Category' : 'Featured Posts'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {otherFeatured.map((post) => (
              <PostCard key={post.id} post={post} featured={true} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {selectedCategory ? 'Posts in Category' : 'Recent Posts'}
        </h2>
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(0, 6).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No posts found in this category.</p>
          </div>
        )}
      </section>
    </>
  )
}