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
    <>
     {/* Search Input Form */}
      <SearchForm searchTerm={searchTerm} onSearchChange={setSearchTerm} />

    <section className="posts-container container">
     
      {/* Posts Grid Display */}
      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No posts found matching &quot;{searchTerm}&quot;.</p>
      ) : (
       
          filteredPosts.map((post) => (
            <article key={post._id} className="item-card">
              {post.mainImage?.asset && (
              
                  <ProgressiveImage
                    imageObject={post.mainImage}
                    alt={post.title || 'Post image'}
                    classNames="post-img"
                    width={600}
                  />
               
              )}
              <div className="card-info">
      
                {post.locationDetails?.cityName && (
                  <h6 className="location">
                    📍 {post.locationDetails.cityName}, {post.locationDetails.countryName}
                  </h6>
                )}
                  <h3 className="post-title">{post.title}</h3>
                <p className="post-desc">{post.excerpt}</p>
                {post.slug?.current && (
                  <Link 
                    href={`/posts/${post._id}`}
                    className="card-link"
                    title='read more'
                  >
                   
                  </Link>
                )}
              </div>
            </article>
          ))
      
      )}
    </section>
    </>
  )
}