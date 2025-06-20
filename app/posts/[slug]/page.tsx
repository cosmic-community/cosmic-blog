// app/posts/[slug]/page.tsx
import { getPostBySlug, getCommentsByPost } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PostContent from '@/components/PostContent'
import CommentSection from '@/components/CommentSection'
import { Post, Comment } from '@/types'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug) as Post | null;

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.metadata?.excerpt || 'Read this post on Cosmic Blog',
    openGraph: {
      title: post.title,
      description: post.metadata?.excerpt || 'Read this post on Cosmic Blog',
      images: post.metadata?.featured_image ? [post.metadata.featured_image.imgix_url] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  
  const [post, comments] = await Promise.all([
    getPostBySlug(slug),
    getPostBySlug(slug).then(async (post) => {
      if (post) {
        return getCommentsByPost(post.id);
      }
      return [];
    })
  ]) as [Post | null, Comment[]];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PostContent post={post} />
        <CommentSection postId={post.id} comments={comments} />
      </div>
    </div>
  )
}