'use client'

import Link from 'next/link'
import ProgressiveImage from '@/components/ProgressiveImage'

interface PostsListProps {
  posts: any[]
  searchTerm: string
}

export default function PostsList({ posts, searchTerm }: PostsListProps) {
  return (
    <section className="posts-container container">
      {posts.length > 0 ? (
        posts.map((post) => (
          <article key={post._id} className="item-card">
            <figure className="post-img">
              {post.mainImage?.asset && (
                <ProgressiveImage imageObject={post.mainImage} alt={post.title} width={600} />
              )}
            </figure>
            <div className="card-info">
              {post.locationDetails && (
                <h6 className="location">
                  📍 {post.locationDetails.cityName}, {post.locationDetails.countryName}
                </h6>
              )}
              <h3 className="post-title">{post.title}</h3>
              <p className="post-desc">{post.excerpt}</p>
              <Link href={`/posts/${post._id}`} title="read more" className="card-link" />
            </div>
          </article>
        ))
      ) : (
        <p className="no-results">No stories found matching "{searchTerm}"</p>
      )}
    </section>
  )
}