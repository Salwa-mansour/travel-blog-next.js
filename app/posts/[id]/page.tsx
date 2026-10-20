import { Suspense } from 'react'
import PostDetails from '@/components/PostDetails'

interface Props {
  params: Promise<{ id: string }>
}

export default function SinglePostPage({ params }: Props) {
  return (
    <Suspense fallback={<PostSkeleton />}>
      <PostDetails params={params} />
    </Suspense>
  )
}

function PostSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-pulse space-y-4">
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
      <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
      <div className="space-y-2 pt-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
      </div>
    </div>
  )
}