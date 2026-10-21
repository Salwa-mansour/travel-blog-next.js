import { client, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPost } from '@/actions/actions'

interface PostDetailsProps {
  params: Promise<{ id: string }>
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