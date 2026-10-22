'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity' // Adjust path to your sanity client

interface ProgressiveImageProps {
  imageObject: any
  alt?: string
  isPrior?: boolean
  classNames?: string
  width?:number
}

export default function ProgressiveImage({
  imageObject,
  alt = 'image',
  isPrior = false,
  classNames = '',
  width=1200,
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Fallback if no image asset exists in Sanity
  if (!imageObject?.asset) {
    return (
      <div className={`relative w-full h-full ${classNames}`}>
        <Image
          src="https://placehold.co/600x400"
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
    )
  }

  // Generate low-res blurred placeholder & optimized high-res URL from Sanity
  const lowResUrl = urlFor(imageObject).width(50).blur(20).url()
  const highResUrl = urlFor(imageObject).width(width).auto('format').url()

  return (
    <div className={` ${classNames}`}>
      {/* Low-res blurred background placeholder */}
      <Image
        src={lowResUrl}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover absolute inset-0 pointer-events-none"
        style={{
          filter: 'blur(12px)',
          opacity: isLoaded ? 0 : 1,
          transition: 'opacity 0.4s ease-in-out',
        }}
      />

      {/* Main high-res image optimized by Next.js */}
      <Image
        src={highResUrl}
        alt={alt}
        fill
        sizes="100vw"
        priority={isPrior}
        onLoad={() => setIsLoaded(true)}
        className="object-cover"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.4s ease-in-out',
        }}
      />
    </div>
  )
}