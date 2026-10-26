import { getPostsList, getPageMetaData } from '@/actions/actions'
import { urlFor } from '@/lib/sanity'
import type { Metadata } from 'next'
import PostsWrapper from '@/components/PostsWrapper'
import { Suspense } from 'react'
import PageHeader from '@/components/PageHeader'

export async function generateMetadata(): Promise<Metadata> {
  // Fetch metadata using the dedicated function with the 'posts' slug
  const pageMetaData = await getPageMetaData('posts')

  const seoTitle = pageMetaData?.seo?.metaTitle || pageMetaData?.title || 'Travel Posts'
  const seoDescription = pageMetaData?.seo?.metaDescription || ''
  const ogImageUrl = pageMetaData?.seo?.openGraphImage
    ? urlFor(pageMetaData.seo.openGraphImage).width(1200).height(630).url()
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

export default async function PostsPage() {
  return (
    <>
      <Suspense fallback={<p>loading ... </p>}>
        <PageHeader slug='posts' />
      </Suspense>
      <Suspense fallback={<p>Loading search...</p>}>
        <PostsWrapper />
      </Suspense>
    </>
  )
}