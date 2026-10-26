import { getPostsList } from '@/actions/actions'
import PostsList from './PostsList'
import { Suspense } from 'react'

export default async function PostsWrapper() {
  const initialPosts = await getPostsList()

  return (
    <Suspense fallback={<p>Loading search...</p>}>
      <PostsList initialPosts={initialPosts} />
    </Suspense>
  )
}