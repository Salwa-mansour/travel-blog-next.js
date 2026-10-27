import Link from 'next/link'
import ProgressiveImage from '@/components/ProgressiveImage'

interface RelatedPostsProps {
  relatedPosts: any[]
  country?: string
}

export default function RelatedPosts({ relatedPosts, country }: RelatedPostsProps) {
  if (!country || !relatedPosts || relatedPosts.length === 0) return null

  return (
    <section className="posts-container">
      <div className="section-heading related">
        <h3>More posts about {country}</h3>
      </div>
      
      <div className="related-posts-grid">
        {relatedPosts.map((post: any) => (
          <article key={post._id} className="item-card">
            {post.mainImage?.asset && (
            
                <ProgressiveImage
                  imageObject={post.mainImage}
                  alt={post.title}
                  width={600} 
                  classNames='post-img'
                  />
            
            )}
            <div className="card-info">
              <h4>{post.title}</h4>
              {post.locationDetails && (
                <h6 className="location">
                  📍 {post.locationDetails.cityName}, {post.locationDetails.countryName}
                </h6>
              )}
              <Link
                href={`/posts/${post._id}`}
                title="read more"
                className="card-link"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}