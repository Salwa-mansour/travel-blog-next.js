// components/CommentForm.tsx
'use client'

import { useActionState, useEffect } from 'react'
import { submitComment } from '@/actions/commentActions'

interface CommentFormProps {
  postId: string
  parentId?: string
  onSuccess?: () => void
}

export default function CommentForm({ postId, parentId, onSuccess }: CommentFormProps) {
  const [state, formAction, isPending] = useActionState(submitComment, null)

  // Automatically trigger onSuccess (e.g. close reply form) when submission succeeds
  useEffect(() => {
    if (state?.success && onSuccess) {
      onSuccess()
    }
  }, [state, onSuccess])

  return (
    <form action={formAction} className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
      {/* Hidden Fields for Post ID and Parent Comment ID */}
      <input type="hidden" name="postId" value={postId} />
      {parentId && <input type="hidden" name="parentId" value={parentId} />}

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Name</label>
        <input 
          type="text" 
          name="name" 
          required 
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Email (optional)</label>
        <input 
          type="email" 
          name="email" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Comment</label>
        <textarea 
          name="comment" 
          rows={3} 
          required 
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder={parentId ? "Write your reply..." : "Write your comment..."}
        />
      </div>

      {/* Response feedback message */}
      {state?.message && (
        <p className={`text-xs font-medium ${state.success ? 'text-green-600' : 'text-red-600'}`}>
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {isPending ? 'Submitting...' : parentId ? 'Post Reply' : 'Post Comment'}
      </button>
    </form>
  )
}