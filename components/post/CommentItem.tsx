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
    <div className="comment-item">
      {/* Top-Level Comment Header */}
      <div className="comment-header">
        <span className="author-name">{comment.name}</span>
        <span className="comment-date">
          {new Date(comment._createdAt).toLocaleDateString()}
        </span>
      </div>
      
      {/* Top-Level Comment Body */}
      <p className="comment-body">
        {/* {comment.parentAuthorName && (
          <span className="font-semibold text-blue-600 mr-1">
            @{comment.parentAuthorName}
          </span>
        )} */}
        {comment.comment}
      </p>

      {/* Reply Toggle Button for Top-Level Comment */}
      <button
        onClick={() => {
          setIsReplying(!isReplying)
          setActiveReplyId(null)
        }}
        className="replay-button"
      >
        {isReplying ? 'Cancel' : '💬 Reply'}
      </button>

      {/* Reply Form for Top-Level Comment */}
      {isReplying && (
        <div className="">
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
              <li key={reply._id} className="comment-item reply-item ">
                <div className="comment-header">
                  <span className="author-name">{reply.name}</span>
                  <span className="comment-date">
                    {new Date(reply._createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <p className="comment-body">
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
                  className="replay-button"
                >
                  {isReplyingToThis ? 'Cancel' : '💬 Reply'}
                </button>

                {/* Reply Form for Individual Reply */}
                {isReplyingToThis && (
                  <div className="">
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