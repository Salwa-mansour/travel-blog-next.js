import { getPostsPageData } from '@/actions/actions'
import { urlFor } from '@/lib/sanity'
import type { Metadata } from 'next'
import PostsWrapper from '@/components/PostsWrapper'

export async function generateMetadata(): Promise<Metadata> {
  const { pageMetaData } = await getPostsPageData()

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
  const { posts, pageMetaData } = await getPostsPageData()

  return <PostsWrapper initialPosts={posts} pageMetaData={pageMetaData} />
}