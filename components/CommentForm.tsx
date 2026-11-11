// components/CommentForm.tsx
'use client'

import { useActionState } from 'react'
import { submitComment } from '@/actions/commentActions';
import "@/css/comment.css";

interface CommentFromPorps{
  postId:string
  parentId?:string
  onSuccess?:any
}

export default function CommentForm({ postId,parentId,onSuccess }:  CommentFromPorps ) {
  const [state, formAction, isPending] = useActionState(submitComment, null)

  return (
    <form action={formAction} onSubmit={()=>onSuccess()} className= "comment-form ">
      <input type="hidden" name="postId" value={postId} />
      <input type="hidden" name="parentId" value={parentId} />
      
      <h3 className="title">Leave a Comment</h3>
      
      <div>
        <label className="block text-sm font-medium mb-1">Name*</label>
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
       
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Comment*</label>
        <textarea 
          name="comment" 
          rows={4} 
          required 
     
        />
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className="hero-button"
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