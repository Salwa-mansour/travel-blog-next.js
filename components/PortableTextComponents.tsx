import { PortableTextComponents } from '@portabletext/react'
import ProgressiveImage from './ProgressiveImage'

export const customPortableTextComponents: PortableTextComponents = {
  types: {
    // Handle standard Sanity image block
    image: ({ value }) => {
      if (!value?.asset) return null

      return (
        <figure className="portable-text-image-container">
          <ProgressiveImage
            imageObject={value}
            alt={value.alt || 'Post image'}
            width={800}
          />
          {value.imageAttribution && (
            <figcaption
              className="image-attribution"
              dangerouslySetInnerHTML={{ __html: value.imageAttribution }}
            />
          )}
        </figure>
      )
    },
    // Handle custom imageWithAttribution block
    imageWithAttribution: ({ value }) => {
      if (!value?.asset) return null

      return (
        <figure className="portable-text-image-container">
          <ProgressiveImage
            imageObject={value}
            alt={value.alt || 'Post image'}
            width={800}
          />
          {value.imageAttribution && (
            <figcaption
              className="image-attribution"
              dangerouslySetInnerHTML={{ __html: value.imageAttribution }}
            />
          )}
        </figure>
      )
    },
  },
}