import { PortableTextComponents } from '@portabletext/react'
import ProgressiveImage from './ProgressiveImage'

export const customPortableTextComponents: PortableTextComponents = {
  types: {
    // Handle standard Sanity image block
    image: ({ value }) => {
      if (!value?.asset) return null

      return (
     
          <ProgressiveImage
            imageObject={value}
            alt={value.alt || 'Post image'}
            width={800}
            classNames='portable-text-image-container'
            imgCaption={value.imageAttribution ? { __html: value.imageAttribution }: null}
          />
         
      
      )
    },
    // Handle custom imageWithAttribution block
    imageWithAttribution: ({ value }) => {
      if (!value?.asset) return null

      return (
       
          <ProgressiveImage
            imageObject={value}
            alt={value.alt || 'Post image'}
            width={800}
            classNames='portable-text-image-container'
            imgCaption={value.imageAttribution ? { __html: value.imageAttribution }: null}
          />
       
      )
    },
  },
}