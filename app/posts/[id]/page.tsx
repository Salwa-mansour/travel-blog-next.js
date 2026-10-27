// app/posts/[id]/page.tsx
import { urlFor } from '@/lib/sanity'
import { getPostDetailData } from '@/actions/actions'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import PostPageContent from '@/components/post/PostPageContent'

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

export default function PostDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="animate-pulse py-12 text-center">Loading page...</div>}>
      <PostPageContent params={params} />
    </Suspense>
  )
}