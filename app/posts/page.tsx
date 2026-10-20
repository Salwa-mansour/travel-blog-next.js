
import PostList from "@/components/PostList"
import { Suspense } from "react"


export default async function PostsPage() {
 
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Blog</h1>
      
      <Suspense >
         <PostList/>
      </Suspense>
    </main>
  )
}