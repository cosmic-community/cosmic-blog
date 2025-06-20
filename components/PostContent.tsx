// components/PostContent.tsx
import { Post } from '@/types'
import CategoryBadge from './CategoryBadge'
import Link from 'next/link'

interface PostContentProps {
  post: Post
}

export default function PostContent({ post }: PostContentProps) {
  const featuredImageUrl = post.metadata?.featured_image?.imgix_url 
    ? `${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`
    : null

  const authorProfileImageUrl = post.metadata?.author?.metadata?.profile_image?.imgix_url
    ? `${post.metadata.author.metadata.profile_image.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`
    : null

  const publishedDate = post.metadata?.published_date 
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null

  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Featured Image */}
      {featuredImageUrl && (
        <div className="aspect-video w-full">
          <img
            src={featuredImageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-8">
        {/* Category Badge */}
        {post.metadata?.category && (
          <div className="mb-4">
            <CategoryBadge category={post.metadata.category} />
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.metadata?.excerpt && (
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {post.metadata.excerpt}
          </p>
        )}

        {/* Author and Date */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
          {post.metadata?.author && (
            <Link 
              href={`/authors/${post.metadata.author.slug}`}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              {authorProfileImageUrl && (
                <img
                  src={authorProfileImageUrl}
                  alt={post.metadata.author.metadata?.full_name || post.metadata.author.title}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-semibold text-gray-900">
                  {post.metadata.author.metadata?.full_name || post.metadata.author.title}
                </p>
                {publishedDate && (
                  <p className="text-sm text-gray-600">{publishedDate}</p>
                )}
              </div>
            </Link>
          )}
        </div>

        {/* Content */}
        {post.metadata?.content && (
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ 
              __html: post.metadata.content.replace(/\n/g, '<br />') 
            }}
          />
        )}

        {/* Tags */}
        {post.metadata?.tags && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {post.metadata.tags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}