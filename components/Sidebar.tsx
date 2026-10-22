import Link from 'next/link'
import ProgressiveImage from '@/components/ProgressiveImage'

interface SidebarProps {
  latestPosts: any[]
}

export default function Sidebar({ latestPosts }: SidebarProps) {
  const tags = [
    'Photography', 'Tokyo', 'Travel', 'Design', 
    'Rainstorms', 'CSS Layouts', 'React', 'Inspiration'
  ]

  return (
    <aside className="blog-sidebar">
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

      <div className="sidebar-widget">
        <h3 className="widget-title">Popular Tags</h3>
        <div className="tags-cloud widget-content">
          {tags.map((tag, index) => (
            <a key={index} href={`#tag-${tag.toLowerCase()}`} className="tag-badge">
              #{tag}
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}