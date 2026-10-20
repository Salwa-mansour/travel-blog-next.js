
import { client } from '@/lib/sanity'
import Link from 'next/link'

async function getPosts() {
  const query = `*[_type == "post"] {
   _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "imageUrl": mainImage.asset->url
  }`
  
  return client.fetch(query)
}
export default async function PostList(){
     const posts = await getPosts()

    return(
         <div className="grid gap-6">
        {posts.map((post: any) => (
          <article key={post.slug.current} className="border p-4 rounded-lg">
            <Link href={`/posts/${post._id}`}>
              <h2 className="text-xl font-semibold hover:underline">{post.title}</h2>
            </Link>
            <p className="text-gray-500 text-sm">{new Date(post.publishedAt).toLocaleDateString()}</p>
            <p className="mt-2">{post.excerpt}</p>
          </article>
        ))}
      </div>
    );
}