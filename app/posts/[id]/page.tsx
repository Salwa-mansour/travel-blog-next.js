import { getPostDetailData } from '@/actions/actions'
import { urlFor } from '@/lib/sanity'
import type { Metadata } from 'next'
import PostData from '@/components/post/PostData'
import Sidebar from '@/components/Sidebar'
import RelatedPosts from '@/components/post/RelatedPosts'
import CommentForm from '@/components/CommentForm'
import CommentList from '@/components/post/CommentList'
import { Suspense } from 'react'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const post = await getPostDetailData(id)

  const seoTitle = post?.seo?.metaTitle || post?.title || 'Travel Blog'
  const seoDescription = post?.seo?.metaDescription || ''
  const ogImageUrl = post?.seo?.openGraphImage
    ? urlFor(post.seo.openGraphImage).width(1200).height(630).url()
    : undefined

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [],
    },
  }
}

export default async function PostDetailPage({ params }: PageProps) {
  const { id } = await params

  return (
    <>
      {/* 1. Add fallback to PostData */}
      <Suspense fallback={<div className="animate-pulse">Loading post...</div>}>
        <PostData postId={id} />
      </Suspense>

      {/* 2. Add fallback to Sidebar */}
      <Suspense fallback={<div className="animate-pulse">Loading sidebar...</div>}>
        <Sidebar />
      </Suspense>

      {/* 3. Add fallback to RelatedPosts */}
      <Suspense fallback={<div className="animate-pulse">Loading related posts...</div>}>
        <RelatedPosts postId={id} />
      </Suspense>
       <Suspense fallback={<div className="animate-pulse">Loading comments ...</div>}>
          <CommentList postId={id} />
      </Suspense>
      <CommentForm postId={id}  />
    </>
  )
}