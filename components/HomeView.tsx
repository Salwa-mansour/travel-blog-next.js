import { getHomeData } from '@/actions/actions'
import Hero from '@/components/Hero'
import Features from '@/components/Featuers'
import '@/css/home.css'
import { Suspense } from 'react'


export default async function HomeView() {
  const { home } = await getHomeData()

  return (
    <>
      <Suspense fallback={<p>loading header ...</p>}>
        <Hero homeData={home} />
      </Suspense>
      <Suspense fallback={<p>loading footer</p>}>
        <Features data={home} />
      </Suspense>
    </>
  )
}