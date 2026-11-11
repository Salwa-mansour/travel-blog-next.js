import { getPageMetaData } from '@/actions/actions'
import { urlFor } from '@/lib/sanity'
import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import { Suspense } from 'react'


interface PageProps {
  params: Promise<{ slug: string }>
}

// 1. Accept params and await slug for metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const pageMetaData = await getPageMetaData(slug)

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

// 2. Accept params here and forward it to PageWrapper
export default async function DinamcePage({ params }: PageProps) {
  return (
    <>
      <Suspense fallback={<p>Loading content...</p>}>
        <PageWrapper params={params} />
      </Suspense>
    </>
  )
}