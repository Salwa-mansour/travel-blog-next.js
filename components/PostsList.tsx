// components/PostsList.tsx
'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import ProgressiveImage from './ProgressiveImage'
import SearchForm from './SearchForm'

interface LocationDetails {
  cityName?: string
  countryName?: string
}

interface Post {
  _id: string
  title?: string
  slug?: { current: string }
  excerpt?: string
  mainImage?: any
  locationDetails?: LocationDetails
  [key: string]: any
}

interface PostsListProps {
  initialPosts: Post[]
}

export default function PostsList({ initialPosts }: PostsListProps) {
  const [searchTerm, setSearchTerm] = useState('')

  // Filter posts instantly on the client side
  const filteredPosts = useMemo(() => {
    const query = searchTerm.toLowerCase().trim()
    if (!query) return initialPosts

    return initialPosts.filter((post) => {
      const titleMatch = post.title?.toLowerCase().includes(query)
      const cityMatch = post.locationDetails?.cityName?.toLowerCase().includes(query)
      const countryMatch = post.locationDetails?.countryName?.toLowerCase().includes(query)

      return titleMatch || cityMatch || countryMatch
    })
  }, [initialPosts, searchTerm])

  return (
    <div className="space-y-6">
      {/* Search Input Form */}
      <SearchForm searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Posts Grid Display */}
      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No posts found matching &quot;{searchTerm}&quot;.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article key={post._id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {post.mainImage?.asset && (
                <div className="relative h-48 w-full">
                  <ProgressiveImage
                    imageObject={post.mainImage}
                    alt={post.title || 'Post image'}
                    classNames="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="p-4 space-y-2">
                <h2 className="font-bold text-lg text-gray-900 line-clamp-1">{post.title}</h2>
                {post.locationDetails?.cityName && (
                  <p className="text-xs text-blue-600 font-medium">
                    📍 {post.locationDetails.cityName}, {post.locationDetails.countryName}
                  </p>
                )}
                <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                {post.slug?.current && (
                  <Link 
                    href={`/posts/${post._id}`}
                    className="inline-block pt-2 text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Read More &rarr;
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}