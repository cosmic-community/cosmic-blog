import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const author = post.metadata?.author;
  const category = post.metadata?.category;
  const featuredImage = post.metadata?.featured_image;

  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Featured Image */}
      {featuredImage && (
        <Link href={`/posts/${post.slug}`}>
          <div className="aspect-w-16 aspect-h-9 bg-gray-200">
            <img
              src={`${featuredImage.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              width={300}
              height={200}
            />
          </div>
        </Link>
      )}

      <div className="p-6">
        {/* Category */}
        {category && (
          <div className="mb-3">
            <CategoryBadge category={category} />
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
          <Link 
            href={`/posts/${post.slug}`}
            className="hover:text-primary-600 transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        {post.metadata?.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.metadata.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          {author && (
            <Link 
              href={`/authors/${author.slug}`}
              className="flex items-center gap-2 hover:text-primary-600 transition-colors"
            >
              {author.metadata?.profile_image && (
                <img
                  src={`${author.metadata.profile_image.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={author.metadata?.full_name || author.title}
                  className="w-6 h-6 rounded-full"
                  width={24}
                  height={24}
                />
              )}
              <span>{author.metadata?.full_name || author.title}</span>
            </Link>
          )}

          {post.metadata?.published_date && (
            <time>
              {new Date(post.metadata.published_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </time>
          )}
        </div>
      </div>
    </article>
  )
}