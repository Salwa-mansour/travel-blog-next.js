import { cache } from 'react'
import { client,urlFor } from '@/lib/sanity'

// React cache deduplicates requests made within the same page render pass
export const getPost = cache(async (id: string) => {
  const query = `*[_type == "post" && _id == $id][0] {
    title,
    excerpt,
    _id,
    publishedAt,
    mainImage {
      ...,
      imageAttribution
    },
    body,
    "authorName": author->name,
    seo {
      metaTitle,
      metaDescription,
      openGraphImage
    }
  }`

  return await client.fetch(query, { id })
});

export const getSiteSettings = cache(async () => {
 const query = `*[_type == "siteSettings"][0]{
    siteName,
    siteLogo,
    footerParagraph
  }`

  const data = await client.fetch(query)

  return {
    siteName: data?.siteName || '',
    siteLogo: data?.siteLogo ? urlFor(data.siteLogo).width(300).url() : '',
    footerParagraph: data?.footerParagraph || '',
  }
})
export const getHomeData = cache(async () => {
  const query = `{
    "home": *[_type == "home"][0]{
      ...,
      heroImage {
        asset,
      },
      "featuresList": featuresList[]{
        ...,
        "heading": coalesce(heading, linkedPost->title),
        "text": coalesce(text, linkedPost->excerpt),
        "image": coalesce(image, linkedPost->mainImage),
        "postId": linkedPost->_id
      },
      seo {
        metaTitle,
        metaDescription,
        openGraphImage
      }
    },
    "settings": *[_type == "siteSettings"][0]{
      siteName,
      title,
      seo {
        metaTitle,
        metaDescription,
        openGraphImage
      }
    }
  }`

  const data = await client.fetch(query)
  return data
})
export const getPostsPageData = cache(async () => {
  const query = `{
    "posts": *[_type == "post"] | order(_createdAt desc){ 
      _id, 
      title, 
      slug,
      excerpt,
      mainImage {
        asset,
        hotspot,
        crop,
        imageAttribution
      },
      body[] {
        ...,
        _type == "image" => {
          asset,
          hotspot,
          crop,
          imageAttribution
        },
        _type == "imageWithAttribution" => {
          asset,
          hotspot,
          crop,
          imageAttribution
        }
      },
      locationDetails 
    },
    "pageMetaData": *[_type == "page" && slug.current == "posts"][0]{
      title,
      headerImage {
        asset,
        hotspot,
        crop,
        imageAttribution
      },
      content,
      seo {
        metaTitle,
        metaDescription,
        openGraphImage
      }
    }
  }`

  return await client.fetch(query)
})

export const getPostDetailData = cache(async (id: string) => {
  const query = `*[_type == "post" && _id == $id][0]{ 
    _id, 
    slug, 
    title, 
    body[] {
      ...,
      _type == "image" => {
        asset,
        hotspot,
        crop,
        imageAttribution
      }
    }, 
    locationDetails, 
    mainImage {
      asset,
      hotspot,
      crop,
      imageAttribution
    }, 
    "seo": {
      "metaTitle": coalesce(seo.metaTitle, title),
      "metaDescription": coalesce(seo.metaDescription, pt::text(body)[0...160]),
      "openGraphImage": coalesce(seo.openGraphImage, mainImage)
    } 
  }`

  return await client.fetch(query, { id })
})

export const getLatestPosts = cache(async () => {
  const query = `*[_type == "post"]  [0...4] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage {
      asset,
     
    }
  }`

  return await client.fetch(query)
})
export const getRelatedPosts = cache(async (country: string, currentId: string) => {
  if (!country) return []

  const query = `*[_type == "post" && locationDetails.countryName == $country && _id != $currentId][0...3] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage {
      asset,
      hotspot,
      crop
    },
    locationDetails
  }`

  return await client.fetch(query, { country, currentId })
})