import { getPostBySlug, getAllPosts } from '@/lib/api'
import { markdownToHtml } from '@/lib/markdown'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import AuthorCard from '@/components/AuthorCard'
import CategoryBadge from '@/components/CategoryBadge'
import type { Post } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.metadata?.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.metadata?.excerpt || post.title,
      images: post.metadata?.featured_image?.imgix_url ? [
        {
          url: `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const content = post.metadata?.content ? markdownToHtml(post.metadata.content) : ''
  const author = post.metadata?.author
  const category = post.metadata?.category
  const featuredImage = post.metadata?.featured_image

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {category && <CategoryBadge category={category} />}
          {post.metadata?.publication_date && (
            <time className="text-gray-500 text-sm">
              {new Date(post.metadata.publication_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          )}
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
        {post.metadata?.excerpt && (
          <p className="text-xl text-gray-600 leading-relaxed">{post.metadata.excerpt}</p>
        )}
      </header>

      {/* Featured Image */}
      {featuredImage && (
        <div className="mb-8">
          <img
            src={`${featuredImage.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Author Card */}
      {author && (
        <div className="mb-8">
          <AuthorCard author={author} showBio={false} />
        </div>
      )}

      {/* Content */}
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Author Bio */}
      {author && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <AuthorCard author={author} showBio={true} />
        </div>
      )}
    </article>
  )
}