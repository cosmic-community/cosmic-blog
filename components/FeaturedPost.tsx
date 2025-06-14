import Link from 'next/link'
import { Post } from '../types'
import CategoryBadge from './CategoryBadge'

interface FeaturedPostProps {
  post: Post
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
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
    <article className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden text-white mb-12">
      <div className="relative">
        {post.metadata.featured_image && (
          <div className="absolute inset-0">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
              alt={post.metadata.title || post.title}
              className="w-full h-full object-cover opacity-30"
              width={1600}
              height={800}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
          </div>
        )}
        
        <div className="relative p-8 md:p-12">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 mb-6">
              <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                ⭐ Featured Post
              </span>
              <CategoryBadge category={category} variant="light" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <Link 
                href={`/posts/${post.slug}`}
                className="hover:text-yellow-300 transition-colors"
              >
                {post.metadata.title || post.title}
              </Link>
            </h1>
            
            {post.metadata.excerpt && (
              <p className="text-xl mb-8 text-gray-100 leading-relaxed max-w-3xl">
                {post.metadata.excerpt}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {author.metadata.profile_photo && (
                  <img
                    src={`${author.metadata.profile_photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                    alt={author.metadata.name || author.title}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                    width={48}
                    height={48}
                  />
                )}
                <div>
                  <p className="font-medium">{author.metadata.name || author.title}</p>
                  <p className="text-sm text-gray-200">
                    {formatDate(publicationDate)}
                  </p>
                </div>
              </div>
              
              <Link 
                href={`/posts/${post.slug}`}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Read Full Article
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}