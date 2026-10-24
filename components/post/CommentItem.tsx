'use client'

import { useState } from 'react'
import CommentForm from '@/components/CommentForm'

interface CommentItemProps {
  comment: {
    _id: string
    name: string
    comment: string
    _createdAt: string
    replies?: any[]
  }
  postId: string
  parentId?: string       // <--- Add this
  onSuccess?: () => void  // <---
}

export default function CommentItem({ comment, postId }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false)

  return (
    <div className="border-l-2 border-gray-200 pl-4 my-4 space-y-3">
      {/* Comment Header */}
      <div className="flex justify-between items-center">
        <span className="font-semibold text-gray-900">{comment.name}</span>
        <span className="text-xs text-gray-400">
          {new Date(comment._createdAt).toLocaleDateString()}
        </span>
      </div>
      
      {/* Comment Body */}
      <p className="text-gray-700 text-sm whitespace-pre-wrap">{comment.comment}</p>

      {/* Reply Toggle Button */}
      <button
        onClick={() => setIsReplying(!isReplying)}
        className="text-xs font-medium text-blue-600 hover:underline"
      >
        {isReplying ? 'Cancel' : 'Reply'}
      </button>

      {/* Conditionally Render Reply Form */}
      {isReplying && (
        <div className="mt-3 pt-2">
          <CommentForm 
            postId={postId} 
            parentId={comment._id} 
            onSuccess={() => setIsReplying(false)} 
          />
        </div>
      )}

      {/* Recursive Render for Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem 
              key={reply._id} 
              comment={reply} 
              postId={postId} 
            />
          ))}
        </div>
      )}
    </div>
  )
}