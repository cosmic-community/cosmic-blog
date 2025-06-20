import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface HeroProps {
  post: Post;
}

export default function Hero({ post }: HeroProps) {
  const author = post.metadata?.author;
  const category = post.metadata?.category;
  const featuredImage = post.metadata?.featured_image;

  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Image */}
      {featuredImage && (
        <div className="absolute inset-0">
          <img
            src={`${featuredImage.imgix_url}?w=1920&h=800&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover opacity-40"
            width={1920}
            height={800}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-900/30" />
        </div>
      )}

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          {/* Category */}
          {category && (
            <div className="mb-4">
              <CategoryBadge category={category} />
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-shadow">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.metadata?.excerpt && (
            <p className="text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed">
              {post.metadata.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-6 mb-8">
            {author && (
              <div className="flex items-center gap-3">
                {author.metadata?.profile_image && (
                  <img
                    src={`${author.metadata.profile_image.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={author.metadata?.full_name || author.title}
                    className="w-10 h-10 rounded-full"
                    width={40}
                    height={40}
                  />
                )}
                <span className="font-medium">
                  {author.metadata?.full_name || author.title}
                </span>
              </div>
            )}

            {post.metadata?.published_date && (
              <time className="text-gray-300">
                {new Date(post.metadata.published_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            )}
          </div>

          {/* CTA */}
          <Link
            href={`/posts/${post.slug}`}
            className="inline-flex items-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
          >
            Read Full Article
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}