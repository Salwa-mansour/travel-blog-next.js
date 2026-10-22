// actions/commentActions.ts
'use server'

import { writeClient } from '@/lib/sanity.write'
import { revalidatePath } from 'next/cache'

// 1. Add prevState as the first parameter
export async function submitComment(
  prevState: { success: boolean; message: string } | null, 
  formData: FormData
) {
  const postId = formData.get('postId') as string
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const comment = formData.get('comment') as string

  if (!name || !comment || !postId) {
    return { success: false, message: 'Missing required fields.' }
  }

  try {
    await writeClient.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: postId,
      },
      name,
      email,
      comment,
      approved: false,
    })

    revalidatePath(`/posts/${postId}`)
    
    return { success: true, message: 'Comment submitted successfully! ' }
  } catch (error) {
    console.error('Failed to submit comment:', error)
    return { success: false, message: 'Something went wrong. Please try again.' }
  }
}