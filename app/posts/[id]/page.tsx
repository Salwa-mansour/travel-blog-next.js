import { getPostDetailData } from '@/actions/actions'
import { urlFor } from '@/lib/sanity'
import type { Metadata } from 'next'
import PostDetailClient from '@/components/PostDetailClient'

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
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  }
}

export default async function PostDetailPage({ params }: PageProps) {
  const { id } = await params
  const post = await getPostDetailData(id)

  return <PostDetailClient post={post} />
}