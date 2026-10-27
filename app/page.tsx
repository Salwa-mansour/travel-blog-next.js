import { getHomeData } from '@/actions/actions'
import { urlFor } from '@/lib/sanity'
import type { Metadata } from 'next'
import HomeView from '@/components/HomeView'
import '@/css/home.css'
import { Suspense } from 'react'

export async function generateMetadata(): Promise<Metadata> {
  const { home, settings } = await getHomeData()

  const seoTitle =
    home?.seo?.metaTitle ||
    home?.heroHeading ||
    settings?.seo?.metaTitle ||
    settings?.title ||
    'DestCast'

  const seoDescription =
    home?.seo?.metaDescription ||
    home?.heroText ||
    settings?.seo?.metaDescription

  const ogImageSource =
    home?.seo?.openGraphImage ||
    home?.heroImage ||
    settings?.seo?.openGraphImage

  const ogImageUrl = ogImageSource
    ? urlFor(ogImageSource).width(1200).height(630).url()
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

export default async function Home() {
 
  return (
    <>
      <Suspense fallback={<p>loading home ...</p>}>
        <HomeView/>
      </Suspense>
    </>
  )
}