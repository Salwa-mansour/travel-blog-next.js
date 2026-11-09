import ProgressiveImage from './ProgressiveImage'
import { getPageMetaData } from '@/actions/actions'

interface PageHeaderProps {
  slug: string
}

export default async function PageHeader({ slug }: PageHeaderProps) {
  const pageMetaData = await getPageMetaData(slug)

  return (
    <header className="page-header">
     
        {pageMetaData?.headerImage?.asset && (
          <ProgressiveImage
            imageObject={pageMetaData.headerImage}
            isPrior={true}
            alt="posts header img"
            classNames='header-img'
            imgCaption={pageMetaData.headerImage.imageAttribution}
          />
        )}
       
    
    </header>
  )
}