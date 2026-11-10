// components/post/CommentItem.tsx
'use client'

import { useState } from 'react'
import CommentForm from '@/components/CommentForm'

interface CommentItemProps {
  comment: {
    _id: string
    name: string
    comment: string
    _createdAt: string
    parentAuthorName?: string
    replies?: any[]
  }
  postId: string
}

export default function CommentItem({ comment, postId }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false)
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null)

  return (
    <div className="main-comment-item">
      {/* Top-Level Comment Header */}
      <div className="">
        <span className="font-semibold text-gray-900">{comment.name}</span>
        <span className="text-xs text-gray-400">
          {new Date(comment._createdAt).toLocaleDateString()}
        </span>
      </div>
      
      {/* Top-Level Comment Body */}
      <p className="text-gray-700 text-sm whitespace-pre-wrap">
        {comment.parentAuthorName && (
          <span className="font-semibold text-blue-600 mr-1">
            @{comment.parentAuthorName}
          </span>
        )}
        {comment.comment}
      </p>

      {/* Reply Toggle Button for Top-Level Comment */}
      <button
        onClick={() => {
          setIsReplying(!isReplying)
          setActiveReplyId(null)
        }}
        className="text-xs font-medium text-blue-600 hover:underline"
      >
        {isReplying ? 'Cancel' : 'Reply'}
      </button>

      {/* Reply Form for Top-Level Comment */}
      {isReplying && (
        <div className="mt-3 pt-2">
          <CommentForm 
            postId={postId} 
            parentId={comment._id} 
            onSuccess={() => setIsReplying(false)} 
          />
        </div>
      )}

      {/* List of Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <ul className="replay-list">
          {comment.replies.map((reply) => {
            const isReplyingToThis = activeReplyId === reply._id

            return (
              <li key={reply._id} className="reply-item ">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800 text-xs">{reply.name}</span>
                  <span className="text-[10px] text-gray-400">
                    {new Date(reply._createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <p className="text-gray-600 text-xs whitespace-pre-wrap">
                  {reply.parentAuthorName && (
                    <span className="parentAuthorName">
                      @{reply.parentAuthorName}
                    </span>
                  )}
                  {reply.comment}
                </p>

                {/* Reply Button for Individual Reply */}
                <button
                  onClick={() => {
                    setActiveReplyId(isReplyingToThis ? null : reply._id)
                    setIsReplying(false)
                  }}
                  className="text-[11px] font-medium text-blue-600 hover:underline mt-1"
                >
                  {isReplyingToThis ? 'Cancel' : 'Reply'}
                </button>

                {/* Reply Form for Individual Reply */}
                {isReplyingToThis && (
                  <div className="mt-2 pt-1">
                    <CommentForm 
                      postId={postId} 
                      parentId={reply._id} 
                      onSuccess={() => setActiveReplyId(null)} 
                    />
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}