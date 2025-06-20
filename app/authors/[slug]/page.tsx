// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PostCard from '@/components/PostCard'
import AuthorProfile from '@/components/AuthorProfile'
import { Author, Post } from '@/types'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug) as Author | null;

  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }

  return {
    title: `${author.metadata?.full_name || author.title} - Cosmic Blog`,
    description: author.metadata?.bio || `Posts by ${author.metadata?.full_name || author.title}`,
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  
  const [author, posts] = await Promise.all([
    getAuthorBySlug(slug),
    getAuthorBySlug(slug).then(async (author) => {
      if (author) {
        return getPostsByAuthor(author.id);
      }
      return [];
    })
  ]) as [Author | null, Post[]];

  if (!author) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Author Profile */}
        <AuthorProfile author={author} />

        {/* Posts Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Posts by {author.metadata?.full_name || author.title}
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No posts found for this author.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}