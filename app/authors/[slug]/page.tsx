import { getAuthorBySlug, getPostsByAuthor } from '@/lib/api'
import PostCard from '@/components/PostCard'
import type { Author, Post } from '@/types'
import { notFound } from 'next/navigation'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  
  try {
    const [authorResult, posts] = await Promise.all([
      getAuthorBySlug(slug),
      getPostsByAuthor(slug)
    ])

    // Handle the case where author is null
    if (!authorResult) {
      notFound()
    }

    const author: Author = authorResult

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-start space-x-6 mb-6">
            {author.metadata.profile_photo?.imgix_url && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={author.metadata.name}
                width={100}
                height={100}
                className="rounded-full"
              />
            )}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {author.metadata.name}
              </h1>
              {author.metadata.bio && (
                <p className="text-lg text-gray-600 mb-4">
                  {author.metadata.bio}
                </p>
              )}
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {author.metadata.website_url && (
                  <a
                    href={author.metadata.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Website
                  </a>
                )}
                {author.metadata.twitter_handle && (
                  <a
                    href={`https://twitter.com/${author.metadata.twitter_handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Twitter
                  </a>
                )}
                {author.metadata.linkedin_url && (
                  <a
                    href={author.metadata.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No posts found by this author.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Posts by {author.metadata.name} ({posts.length})
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error fetching author data:', error)
    notFound()
  }
}