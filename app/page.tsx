import { getHomeData } from '@/actions/actions'
import { urlFor } from '@/lib/sanity'
import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import Features from '@/components/Featuers'
import '@/css/home.css'

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
  const { home } = await getHomeData()

  return (
    <>
      <Hero homeData={home} />
      <Features data={home} />
    </>
  )
}