import Link from 'next/link'
import { BlogPost } from '@/types'
import { calculateReadingTime, formatDate } from '@/lib/utils'
import CategoryBadge from '@/components/CategoryBadge'

interface FeaturedPostProps {
  post: BlogPost
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
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
          <div className="aspect-video md:aspect-[21/9] overflow-hidden rounded-xl mb-6">
            <img
              src={`${featuredImage.imgix_url}?w=1600&h=700&fit=crop&auto=format,compress`}
              alt={post.title}
              width={800}
              height={350}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
      </Link>

      <div className="max-w-2xl">
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <CategoryBadge category={category} />
              </Link>
            ))}
          </div>
        )}

        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
            {post.title}
          </h2>
        </Link>

        {post.metadata?.excerpt && (
          <p className="text-gray-600 mb-4">{post.metadata.excerpt}</p>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          {author && (
            <Link
              href={`/authors/${author.slug}`}
              className="flex items-center gap-2 hover:text-gray-700"
            >
              {author.metadata?.avatar && (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={author.metadata?.name || author.title}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span>{author.metadata?.name || author.title}</span>
            </Link>
          )}
          {publishedDate && <span>{formatDate(publishedDate)}</span>}
          <span>{readingTime} min read</span>
        </div>
      </div>
    </article>
  )
}