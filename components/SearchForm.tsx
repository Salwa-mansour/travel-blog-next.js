// components/SearchForm.tsx
'use client'

interface SearchFormProps {
  searchTerm: string
  onSearchChange: (query: string) => void
}

export default function SearchForm({ searchTerm, onSearchChange }: SearchFormProps) {
  return (
    <form className="search-post" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search by title, city, or country..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </form>
  )
}