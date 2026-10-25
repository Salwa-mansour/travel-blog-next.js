// components/CommentForm.tsx
'use client'

import { useActionState } from 'react'
import { submitComment } from '@/actions/commentActions';

interface CommentFromPorps{
  postId:string
  parentId?:string
  onSuccess?:any
}

export default function CommentForm({ postId,parentId,onSuccess }:  CommentFromPorps ) {
  const [state, formAction, isPending] = useActionState(submitComment, null)

  return (
    <form action={formAction} onSubmit={()=>onSuccess()} className= "comment-form space-y-4 max-w-lg mt-8 color-[#333] m-auto">
      <input type="hidden" name="postId" value={postId} />
      <input type="hidden" name="parentId" value={parentId} />
      
      <h3 className="text-xl font-bold">Leave a Comment</h3>
      
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input 
          type="text" 
          name="name" 
          required 
          className="w-full border p-2 rounded" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email (optional)</label>
        <input 
          type="email" 
          name="email" 
          className="w-full border p-2 rounded" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Comment</label>
        <textarea 
          name="comment" 
          rows={4} 
          required 
          className="w-full border p-2 rounded" 
        />
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {isPending ? 'Submitting...' : 'Post Comment'}
      </button>

      {state?.message && (
        <p className={`text-sm ${state.success ? 'text-green-600' : 'text-red-600'}`}>
          {state.message}
        </p>
      )}
    </form>
  )
}