import { Author } from '../types'

interface AuthorCardProps {
  author: Author
  showBio?: boolean
}

export default function AuthorCard({ author, showBio = true }: AuthorCardProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mt-8">
      <div className="flex items-start space-x-4">
        {author.metadata.profile_photo && (
          <img
            src={`${author.metadata.profile_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
            alt={author.metadata.name || author.title}
            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
            width={64}
            height={64}
          />
        )}
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            About {author.metadata.name || author.title}
          </h3>
          
          {showBio && author.metadata.bio && (
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {author.metadata.bio}
            </p>
          )}
          
          <div className="flex flex-wrap gap-3">
            {author.metadata.website_url && (
              <a
                href={author.metadata.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors"
              >
                Website
              </a>
            )}
            
            {author.metadata.twitter_handle && (
              <a
                href={`https://twitter.com/${author.metadata.twitter_handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors"
              >
                Twitter
              </a>
            )}
            
            {author.metadata.linkedin_url && (
              <a
                href={author.metadata.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors"
              >
                LinkedIn
              </a>
            )}
            
            {author.metadata.email && (
              <a
                href={`mailto:${author.metadata.email}`}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors"
              >
                Email
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}