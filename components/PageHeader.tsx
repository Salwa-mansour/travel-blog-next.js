import ProgressiveImage from './ProgressiveImage'

interface PageHeaderProps {
  pageMetaData: any
}

export default function PageHeader({ pageMetaData }: PageHeaderProps) {
  return (
    <header className="page-header">
      <figure className="header-img" tabIndex={-1}>
        {pageMetaData?.headerImage?.asset && (
          <ProgressiveImage
            imageObject={pageMetaData.headerImage}
            isPrior={true}
            alt="posts header img"
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