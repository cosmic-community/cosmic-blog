// components/AuthorProfile.tsx
import { Author } from '@/types'

interface AuthorProfileProps {
  author: Author
}

export default function AuthorProfile({ author }: AuthorProfileProps) {
  const profileImageUrl = author.metadata?.profile_image?.imgix_url 
    ? `${author.metadata.profile_image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`
    : null

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Profile Image */}
        {profileImageUrl && (
          <div className="flex-shrink-0">
            <img
              src={profileImageUrl}
              alt={author.metadata?.full_name || author.title}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
            />
          </div>
        )}

        {/* Author Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {author.metadata?.full_name || author.title}
          </h1>
          
          {author.metadata?.bio && (
            <p className="text-gray-600 text-lg mb-4 leading-relaxed">
              {author.metadata.bio}
            </p>
          )}

          {/* Social Links */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {author.metadata?.email && (
              <a
                href={`mailto:${author.metadata.email}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                📧 Email
              </a>
            )}
            
            {author.metadata?.website && (
              <a
                href={author.metadata.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                🌐 Website
              </a>
            )}
            
            {author.metadata?.twitter_handle && (
              <a
                href={`https://twitter.com/${author.metadata.twitter_handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
              >
                🐦 Twitter
              </a>
            )}
            
            {author.metadata?.linkedin_url && (
              <a
                href={author.metadata.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
              >
                💼 LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}