import { getAllAuthors } from '@/lib/api'
import Link from 'next/link'
import type { Author } from '@/types'

export default async function AuthorsPage() {
  const authors: Author[] = await getAllAuthors()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Authors</h1>
      
      {authors.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">No authors found.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <Link
              key={author.id}
              href={`/authors/${author.slug}`}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="flex items-center mb-4">
                {author.metadata.profile_photo?.imgix_url && (
                  <img
                    src={`${author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={author.metadata.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                )}
                <h2 className="text-xl font-semibold text-gray-900">
                  {author.metadata.name}
                </h2>
              </div>
              {author.metadata.bio && (
                <p className="text-gray-600 text-sm line-clamp-3">
                  {author.metadata.bio}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}