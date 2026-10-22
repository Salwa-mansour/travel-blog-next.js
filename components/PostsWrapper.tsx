'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import PageHeader from './PageHeader'
import SearchForm from './SearchForm'
import PostsList from './PostsList'

interface PostsWrapperProps {
  initialPosts: any[]
  pageMetaData: any
}

export default function PostsWrapper({ initialPosts, pageMetaData }: PostsWrapperProps) {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  
  const [searchTerm, setSearchTerm] = useState(initialSearch)

  // Filter posts based on search term (title, city, or country)
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
      <PageHeader pageMetaData={pageMetaData} />
      <SearchForm onSearchChange={setSearchTerm} />
      <PostsList posts={filteredPosts} searchTerm={searchTerm} />
    </>
  )
}