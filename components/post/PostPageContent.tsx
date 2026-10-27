// components/post/PostPageContent.tsx
import { Suspense } from 'react'
import PostData from '@/components/post/PostData'
import Sidebar from '@/components/Sidebar'
import RelatedPosts from '@/components/post/RelatedPosts'
import CommentForm from '@/components/CommentForm'
import CommentList from '@/components/post/CommentList'

interface PostPageContentProps {
  params: Promise<{ id: string }>
}

export default async function PostPageContent({ params }: PostPageContentProps) {
  const { id } = await params

  return (
    <>
      <Suspense fallback={<div className="animate-pulse">Loading post...</div>}>
        <PostData postId={id} />
      </Suspense>

      <Suspense fallback={<div className="animate-pulse">Loading sidebar...</div>}>
        <Sidebar />
      </Suspense>

      <Suspense fallback={<div className="animate-pulse">Loading related posts...</div>}>
        <RelatedPosts postId={id} />
      </Suspense>

      <Suspense fallback={<div className="animate-pulse">Loading comments...</div>}>
        <CommentList postId={id} />
      </Suspense>

      <CommentForm postId={id} />
    </>
  )
}