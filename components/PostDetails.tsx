import { client, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface PostDetailsProps {
  params: Promise<{ id: string }>
}

async function getPost(id: string) {
  const query = `*[_type == "post" && _id == $id][0] {
    title,
    _id,
    publishedAt,
    mainImage {
      ...,
      imageAttribution
    },
    body,
    "authorName": author->name
  }`

  const post = await client.fetch(query, { id })
  return post
}

export default async function PostDetails({ params }: PostDetailsProps) {
  // Await params safely inside the Suspense boundary
  const { id } = await params
  const post = await getPost(id)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <div className="text-gray-500 text-sm mb-6 flex items-center gap-4">
        {post.authorName && <span>By {post.authorName}</span>}
        {post.publishedAt && (
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        )}
      </div>

      {post.mainImage && (
        <div className="mb-8">
          <div className="relative w-full h-80 rounded-lg overflow-hidden">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {post.mainImage.imageAttribution && (
            <p className="text-xs text-gray-500 mt-2 italic">
              {post.mainImage.imageAttribution}
            </p>
          )}
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {post.body && <PortableText value={post.body} />}
      </div>
    </article>
  )
}