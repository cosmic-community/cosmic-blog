import Link from 'next/link'
import { Post } from '../types'
import CategoryBadge from './CategoryBadge'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const category = post.metadata.category
  const author = post.metadata.author
  const publicationDate = post.metadata.publication_date

  if (!category || !author || !publicationDate) {
    return null
  }

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg dark:shadow-gray-900/20 overflow-hidden transition-all duration-300">
      {post.metadata.featured_image && (
        <Link href={`/posts/${post.slug}`}>
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={post.metadata.title || post.title}
            className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
            width={800}
            height={400}
          />
        </Link>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <CategoryBadge category={category} />
          <time className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(publicationDate)}
          </time>
        </div>
        
        <h2 className="text-xl font-semibold mb-3">
          <Link 
            href={`/posts/${post.slug}`}
            className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {post.metadata.title || post.title}
          </Link>
        </h2>
        
        {post.metadata.excerpt && (
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {post.metadata.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {author.metadata.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={author.metadata.name || author.title}
                className="w-10 h-10 rounded-full object-cover"
                width={40}
                height={40}
              />
            )}
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {author.metadata.name || author.title}
            </span>
          </div>
          
          <Link 
            href={`/posts/${post.slug}`}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  )
}