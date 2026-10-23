import { getLatestPosts } from "@/actions/actions"
import ProgressiveImage from "../ProgressiveImage"
import Link from "next/link"



export default async function  LatestPosts() {
    const latestPosts = await getLatestPosts()

    return (
         <div className="sidebar-widget">
        <h3 className="widget-title">Latest Posts</h3>
        <div className="latest-posts-list widget-content">
          {latestPosts?.map((post: any) => (
            <Link key={post._id} href={`/posts/${post._id}`} className="post-item">
              <ProgressiveImage
                imageObject={post.mainImage}
                alt={post.title}
                classNames="post-thumbnail"
                width={200}
              />
              <div className="post-info">
                <span className="post-date">
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '10/14/2026'}
                </span>
                <h4 className="post-title">{post.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>

    )
}