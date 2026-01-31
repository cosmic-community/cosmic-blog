// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor, getAllAuthors } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export async function generateStaticParams() {
  const authors = await getAllAuthors()
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to all posts
      </Link>

      {/* Author Header */}
      <div className="flex flex-col sm:flex-row items-start gap-6 mb-12">
        {author.metadata?.avatar && (
          <img
            src={`${author.metadata.avatar.imgix_url}?w=256&h=256&fit=crop&auto=format,compress`}
            alt={author.metadata?.name || author.title}
            width={128}
            height={128}
            className="rounded-full"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {author.metadata?.name || author.title}
          </h1>
          {author.metadata?.bio && (
            <p className="text-gray-600 mb-4">{author.metadata.bio}</p>
          )}
          <div className="flex gap-4 text-sm">
            {author.metadata?.twitter && (
              <a
                href={`https://twitter.com/${author.metadata.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {author.metadata.twitter}
              </a>
            )}
            {author.metadata?.email && (
              <a
                href={`mailto:${author.metadata.email}`}
                className="text-gray-500 hover:text-gray-700"
              >
                {author.metadata.email}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Author Posts */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Articles by {author.metadata?.name || author.title}
        </h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts by this author yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} showAuthor={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}