'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import ProgressiveImage from '@/components/ProgressiveImage'

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  homeData: any
}

export default function Hero({ homeData }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      document.body.classList.add('js-enabled')

      // ScrollTrigger: Hero Glow Animation
      gsap.to('.sun-glow-wrapper', {
        opacity: 0.2,
        scale: 0.7,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Hero Content Entrance Animation
      gsap.from('.hero-content > *', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2,
      })

      // ScrollTrigger: Hero Background Zoom Illusion
      gsap.to('.hero-image-wrapper', {
        scale: 1.15,
        duration: 12,
        ease: 'sine.inOut',
        force3D: true,
      })

      return () => {
        document.body.classList.remove('js-enabled')
      }
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef}>
      <section className="hero">
        <div className="hero-image-wrapper">
          {homeData && (
            <ProgressiveImage
              imageObject={homeData.heroImage}
              alt={'Hero background visual'}
              isPrior={true}
              classNames={'hero-image'}
            />
          )}

          <div className="sun-glow-wrapper">
            <div className="sun-shine"></div>
            <svg viewBox="0 0 100 100" className="sun-icon">
              <g strokeLinecap="round" strokeLinejoin="round">
                <circle
                  cx="50"
                  cy="50"
                  r="18"
                  className="sun-body"
                  fill="#FFDE59"
                  stroke="#FF914D"
                  strokeWidth="4"
                />
                <g className="sun-rays" stroke="#FF914D" strokeWidth="4">
                  <line x1="50" y1="19" x2="50" y2="28" />
                  <line x1="50" y1="72" x2="50" y2="81" />
                  <line x1="19" y1="50" x2="28" y2="50" />
                  <line x1="72" y1="50" x2="81" y2="50" />
                  <line x1="28" y1="28" x2="34" y2="34" />
                  <line x1="66" y1="66" x2="72" y2="72" />
                  <line x1="28" y1="72" x2="34" y2="66" />
                  <line x1="66" y1="34" x2="72" y2="28" />
                </g>
              </g>
            </svg>
          </div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            {homeData?.heroHeading || 'Adventure'}
          </h1>
          <p>
            {homeData?.heroText || 'Discover the world with us and decide your next intended path'}
          </p>
          <Link
            className="hero-button"
            href={homeData?.heroCtaLink || '/posts'}
          >
            {homeData?.heroCtaText || 'Start Discovering'}
          </Link>
        </div>
      </section>
    </div>
  )
}