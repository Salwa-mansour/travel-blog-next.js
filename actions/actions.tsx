import { cache } from 'react'
import { client } from '@/lib/sanity'

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
}) 