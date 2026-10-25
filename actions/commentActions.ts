// actions/commentActions.ts
'use server'
import { cache } from 'react'
import { writeClient } from '@/lib/sanity.write'
import { revalidatePath } from 'next/cache'
import { client} from '@/lib/sanity'


// 1. Add prevState as the first parameter
export async function submitComment(prevState: any, formData: FormData) {
  const postId = formData.get('postId') as string
  const parentId = formData.get('parentId') as string | null
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const comment = formData.get('comment') as string

  if (!name || !comment || !postId) {
    return { success: false, message: 'Missing required fields.' }
  }

  try {
    await writeClient.create({
      _type: 'comment',
      post: { _type: 'reference', _ref: postId },
      // Include parentComment reference only if it's a reply
      parentComment: parentId ? { _type: 'reference', _ref: parentId } : undefined,
      name,
      email,
      comment,
      approved: true,
    })

    revalidatePath(`/posts/${postId}`)
    return { success: true, message: 'Comment submitted successfully!' }
  } catch (error) {
    console.error('Failed to submit comment:', error)
    return { success: false, message: 'Something went wrong.' }
  }
}

export const getPostComments = cache(async ( postId: string) => {
  if (!postId) return []

  const query = `*[_type == "comment" && post._ref == $postId && approved == true] | order(_createdAt asc) {
  _id,
  name,
  comment,
  _createdAt,
  "parentId": parentComment._ref
}`

  return await client.fetch(query, { postId })
})