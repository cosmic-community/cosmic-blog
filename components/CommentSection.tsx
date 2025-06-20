// components/CommentSection.tsx
'use client'

import { useState } from 'react'
import { Comment } from '@/types'

interface CommentSectionProps {
  postId: string
  comments: Comment[]
}

interface CommentItemProps {
  comment: Comment
  level?: number
}

function CommentItem({ comment, level = 0 }: CommentItemProps) {
  const isReply = level > 0
  const authorWebsite = comment.metadata?.author_website

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className={`${isReply ? 'ml-8 mt-4' : 'mb-6'}`}>
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {authorWebsite ? (
              <a
                href={authorWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 hover:text-blue-800"
              >
                {comment.metadata?.author_name}
              </a>
            ) : (
              <span className="font-semibold text-gray-900">
                {comment.metadata?.author_name}
              </span>
            )}
            {comment.metadata?.status?.value === 'pending' && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                Pending
              </span>
            )}
          </div>
          <time className="text-sm text-gray-500">
            {formatDate(comment.created_at)}
          </time>
        </div>
        
        <div className="text-gray-700 whitespace-pre-wrap">
          {comment.metadata?.content}
        </div>
      </div>
    </div>
  )
}

export default function CommentSection({ postId, comments }: CommentSectionProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  // Filter approved comments and organize them
  const approvedComments = comments.filter(
    comment => comment.metadata?.status?.value === 'approved'
  )

  // Separate top-level comments and replies
  const topLevelComments = approvedComments.filter(
    comment => !comment.metadata?.parent_comment
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author_name: name,
          author_email: email,
          author_website: website || null,
          content,
          post_id: postId,
        }),
      })

      if (response.ok) {
        setSubmitMessage('Thank you for your comment! It will be reviewed before being published.')
        setName('')
        setEmail('')
        setWebsite('')
        setContent('')
      } else {
        setSubmitMessage('There was an error submitting your comment. Please try again.')
      }
    } catch (error) {
      setSubmitMessage('There was an error submitting your comment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Comments ({approvedComments.length})
      </h2>

      {/* Comment Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave a Comment</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Comment *
            </label>
            <textarea
              id="content"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Comment'}
          </button>
          
          {submitMessage && (
            <p className={`text-sm ${submitMessage.includes('error') ? 'text-red-600' : 'text-green-600'}`}>
              {submitMessage}
            </p>
          )}
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {topLevelComments.length > 0 ? (
          topLevelComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <p className="text-gray-600 text-center py-8">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  )
}