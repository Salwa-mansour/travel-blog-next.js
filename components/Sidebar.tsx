
import LatestPosts from './post/LatestPosts'



export default function Sidebar() {
  const tags = [
    'Photography', 'Tokyo', 'Travel', 'Design', 
    'Rainstorms', 'CSS Layouts', 'React', 'Inspiration'
  ]

  return (
    <aside className="blog-sidebar">

      <LatestPosts  />

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