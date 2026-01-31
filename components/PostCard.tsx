import Link from 'next/link'
import { BlogPost } from '@/types'
import { calculateReadingTime, formatDate } from '@/lib/utils'
import CategoryBadge from '@/components/CategoryBadge'

interface PostCardProps {
  post: BlogPost
  showAuthor?: boolean
}

export default function PostCard({ post, showAuthor = true }: PostCardProps) {
  const content = post.metadata?.content || ''
  const readingTime = calculateReadingTime(content)
  const author = post.metadata?.author
  const categories = post.metadata?.categories || []
  const publishedDate = post.metadata?.published_date
  const featuredImage = post.metadata?.featured_image

  return (
    <article className="group">
      <Link href={`/posts/${post.slug}`}>
        {featuredImage && (
          <div className="aspect-video overflow-hidden rounded-lg mb-4">
            <img
              src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={post.title}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
      </Link>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {categories.slice(0, 2).map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <CategoryBadge category={category} size="sm" />
            </Link>
          ))}
        </div>
      )}

      <Link href={`/posts/${post.slug}`}>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
          {post.title}
        </h3>
      </Link>

      {post.metadata?.excerpt && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {post.metadata.excerpt}
        </p>
      )}

      <div className="flex items-center gap-3 text-xs text-gray-500">
        {showAuthor && author && (
          <Link
            href={`/authors/${author.slug}`}
            className="flex items-center gap-1.5 hover:text-gray-700"
          >
            {author.metadata?.avatar && (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
                alt={author.metadata?.name || author.title}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span>{author.metadata?.name || author.title}</span>
          </Link>
        )}
        {publishedDate && <span>{formatDate(publishedDate)}</span>}
        <span>{readingTime} min read</span>
      </div>
    </article>
  )
}