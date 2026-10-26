import ProgressiveImage from './ProgressiveImage'
import { getPageMetaData } from '@/actions/actions'

interface PageHeaderProps {
  slug: string
}

export default async function PageHeader({ slug }: PageHeaderProps) {
  const pageMetaData = await getPageMetaData(slug)

  return (
    <header className="page-header">
      <figure className="" tabIndex={-1}>
        {pageMetaData?.headerImage?.asset && (
          <ProgressiveImage
            imageObject={pageMetaData.headerImage}
            isPrior={true}
            alt="posts header img"
            classNames='header-img'
          />
        )}
        <figcaption
          className="image-attribution"
          dangerouslySetInnerHTML={{ __html: pageMetaData?.headerImage?.imageAttribution || '' }}
        />
      </figure>
    </header>
  )
}