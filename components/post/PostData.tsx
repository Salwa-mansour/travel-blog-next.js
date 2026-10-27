
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import Sidebar from '@/components/Sidebar'
import RelatedPosts from '@/components/RelatedPosts'
import { customPortableTextComponents } from '@/components/PortableTextComponents'
import ProgressiveImage from '@/components/ProgressiveImage'
import '@/css/postDetail.css'
import { getPostDetailData } from '@/actions/actions'

interface PostDataProps{
    postId:string
}

export default async function PostData({ postId }: PostDataProps) {
  if (!postId) {
    return (
      <section className="postDetail-container container">
        <p className="error-text">Post not found.</p>
      </section>
    )
  }
const post = await getPostDetailData(postId)

  return (
    <>
      <section className="postDetail-container ">
        <div className="main-wrapper">
          <Link href="/posts" className="back-link" title="Back to All Posts">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="back-caret-icon">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>

          <article className="single-page-content">
            <header className="post-header" role="region" aria-label="Post Header">
              {post.mainImage?.asset && (
               
                  <ProgressiveImage 
                    imageObject={post.mainImage}
                    alt={post.title}
                    isPrior={true}
                    classNames='main-img'
                    imgCaption={post.mainImage.imageAttribution ?{ __html: post.mainImage.imageAttribution } :null } />
                 
                  
               
              )}
              <div className="post-header__data">
                <h1 className="post-title">{post.title}</h1>
                {post.locationDetails && (
                  <h6 className="location">
                    📍 {post.locationDetails.cityName}, {post.locationDetails.countryName}
                  </h6>
                )}
              </div>
            </header>

            {/* <Sidebar latestPosts={latestPosts} /> */}

            <div className="post">
              <div className="text-container">
                {post.body ? (
                  <PortableText value={post.body} components={customPortableTextComponents} />
                ) : (
                  <p>No content written yet.</p>
                )}
              </div>
            </div>
          </article>
        </div>
      </section>
                
      {/* <section>
        <RelatedPosts relatedPosts={relatedPosts} country={post?.locationDetails?.countryName} />
      </section> */}
    </>
  )
}