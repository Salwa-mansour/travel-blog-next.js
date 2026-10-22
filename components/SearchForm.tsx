'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface SearchFormProps {
  onSearchChange: (query: string) => void
}

export default function SearchForm({ onSearchChange }: SearchFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ''

  const [searchTerm, setSearchTerm] = useState(initialSearch)

  // Keep input synced if URL changes externally
  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '')
  }, [searchParams])

  // Debounce input and update URL params
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = searchTerm.trim()
      onSearchChange(trimmed)

      const params = new URLSearchParams(searchParams.toString())
      if (trimmed) {
        params.set('search', trimmed)
      } else {
        params.delete('search')
      }
      router.replace(`?${params.toString()}`, { scroll: false })
    }, 400)

    return () => clearTimeout(timer)
  }, [searchTerm, router, searchParams, onSearchChange])

  return (
    <form className="search-post" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search by title, city, or country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  )
}