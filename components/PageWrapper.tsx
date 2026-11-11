import { getPageMetaData } from '@/actions/actions'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import PageHeader from '@/components/PageHeader'
import ContactForm from '@/components/ContactForm'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function PageWrapper({ params }: PageProps) {
  // Await the params promise passed from the parent page
  const { slug } = await params
  const pageData = await getPageMetaData(slug)

  // If no page is found in Sanity, trigger a 404
  if (!pageData) {
    notFound()
  }

  return (
    <>
      <Suspense fallback={<p>loading header...</p>}>
        <PageHeader slug={slug} />
      </Suspense>

      <section className="main-container">
        {pageData.content ? (
          <div className="text-container">
            <PortableText value={pageData.content} />
            {slug === 'contact' && (
                <ContactForm />
              )}
          </div>
        ) : (
          <div className="text-container">
            <p className="text-gray-500">No content added yet.</p>
          </div>
        )}
      </section>
    </>
  )
}