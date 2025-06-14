import Link from 'next/link'
import { Post } from '../types'
import CategoryBadge from './CategoryBadge'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured }: PostCardProps) {
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
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
          <time className="text-sm text-gray-500">
            {formatDate(publicationDate)}
          </time>
        </div>
        
        <h2 className="text-xl font-semibold mb-3">
          <Link 
            href={`/posts/${post.slug}`}
            className="text-gray-900 hover:text-blue-600 transition-colors"
          >
            {post.metadata.title || post.title}
          </Link>
        </h2>
        
        {post.metadata.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
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
            <span className="text-sm text-gray-700">
              {author.metadata.name || author.title}
            </span>
          </div>
          
          <Link 
            href={`/posts/${post.slug}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  )
}