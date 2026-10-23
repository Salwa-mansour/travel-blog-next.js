import { getPostDetailData,getRelatedPosts } from "@/actions/actions"
import ProgressiveImage from "../ProgressiveImage"
import Link from "next/link"

interface RelatedPostsProps{
    postId: string
}
export default async function RelatedPosts({postId}:RelatedPostsProps) {
    const countryName = (await getPostDetailData(postId))?.locationDetails?.countryName; 
    const relatedPosts = await getRelatedPosts(countryName,postId)

    if(!countryName )
        return null

  return (
    <section className="posts-container">
      <div className="section-heading related">
        <h3>More posts about {countryName}</h3>
      </div>
      
      <div className="related-posts-grid">
        {relatedPosts.map((post: any) => (
          <article key={post._id} className="item-card">
            {post.mainImage?.asset && (
              <figure className="post-img">
                <ProgressiveImage imageObject={post.mainImage} alt={post.title} width={600} />
              </figure>
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