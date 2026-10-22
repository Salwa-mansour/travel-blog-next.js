import { getPostDetailData, getLatestPosts, getRelatedPosts } from '@/actions/actions'
import { urlFor } from '@/lib/sanity'
import type { Metadata } from 'next'
import PostDetailClient from '@/components/PostDetailClient'
import { Suspense } from 'react'
import CommentForm from '@/components/CommentForm'


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
  
  // Fetch everything concurrently on the server (bypasses CORS entirely)
  const post = await getPostDetailData(id)
  const latestPosts = await getLatestPosts()
  const relatedPosts = post?.locationDetails?.countryName 
    ? await getRelatedPosts(post.locationDetails.countryName, post.slug?.current)
    : []

  return (
    <>
        <PostDetailClient 
          post={post} 
          latestPosts={latestPosts} 
          relatedPosts={relatedPosts} 
        />
   <CommentForm  postId={id}/>
   </>
  )
}