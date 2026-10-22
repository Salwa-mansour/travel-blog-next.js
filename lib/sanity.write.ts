// lib/sanity.write.ts
import { createClient } from '@sanity/client'

export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-03-01',
  token: process.env.SANITY_API_WRITE_TOKEN, // Uses secret server-side token
  useCdn: false, // Must be false for mutations
})