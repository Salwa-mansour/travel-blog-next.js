import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2024-03-01',
})

// Use createImageUrlBuilder instead of the default export
const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}