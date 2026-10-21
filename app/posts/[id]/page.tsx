import { Suspense } from 'react'
import PostDetails from '@/components/PostDetails'
import { getPost } from '@/actions/actions'
import { urlFor } from '@/lib/sanity'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const post = await getPost(id)
 
  if (!post) {
    return { title: 'Post Not Found' }
  }

  const seoTitle = post.seo?.metaTitle || post.title
  const seoDescription = post.seo?.metaDescription || post.excerpt
  const ogImageUrl = post.seo?.openGraphImage 
    ? urlFor(post.seo.openGraphImage).width(1200).height(630).url() 
    : urlFor(post.mainImage).width(1200).height(630).url()

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: ogImageUrl 
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: seoTitle,
            },
          ] 
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  }
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
    </div>
  )
}