// app/posts/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { calculateReadingTime, formatDate } from '@/lib/utils'
import CategoryBadge from '@/components/CategoryBadge'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const content = post.metadata?.content || ''
  const readingTime = calculateReadingTime(content)
  const author = post.metadata?.author
  const categories = post.metadata?.categories || []
  const publishedDate = post.metadata?.published_date
  const featuredImage = post.metadata?.featured_image

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

      {/* Categories */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <CategoryBadge category={category} />
            </Link>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
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
        {publishedDate && (
          <span>{formatDate(publishedDate)}</span>
        )}
        <span>{readingTime} min read</span>
      </div>

      {/* Featured Image */}
      {featuredImage && (
        <img
          src={`${featuredImage.imgix_url}?w=1400&h=700&fit=crop&auto=format,compress`}
          alt={post.title}
          width={700}
          height={350}
          className="w-full rounded-lg mb-8"
        />
      )}

      {/* Content */}
      <div className="prose max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      {/* Author Bio */}
      {author && author.metadata?.bio && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href={`/authors/${author.slug}`}
            className="flex items-start gap-4"
          >
            {author.metadata?.avatar && (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                alt={author.metadata?.name || author.title}
                width={64}
                height={64}
                className="rounded-full"
              />
            )}
            <div>
              <p className="font-semibold text-gray-900">
                {author.metadata?.name || author.title}
              </p>
              <p className="text-gray-600 text-sm mt-1">{author.metadata.bio}</p>
            </div>
          </Link>
        </div>
      )}
    </article>
  )
}