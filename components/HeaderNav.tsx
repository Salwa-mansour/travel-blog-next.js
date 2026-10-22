'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { NavbarSearch } from './NavbarSearch'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface HeaderNavProps {
  siteData: {
    siteName: string
    siteLogo: string
  }
}

export default function HeaderNav({ siteData }: HeaderNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  // Handle body overflow toggle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // GSAP MatchMedia & Timeline
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(max-width: 866px)', () => {
        const tl = gsap.timeline({ paused: true })

        tl.to('.nav-container', {
          x: '0%',
          duration: 0.5,
          ease: 'power3.out',
        })
          .to('#line-2', { opacity: 0, x: -20, duration: 0.2 }, '<')
          .to('#line-1', { rotate: 45, transformOrigin: '50% 50%', y: 15, duration: 0.3 }, '<')
          .to('#line-3', { rotate: -45, transformOrigin: '50% 50%', y: -15, duration: 0.3 }, '<')
          .from(
            '.nav-items li',
            {
              opacity: 0,
              y: 30,
              duration: 0.4,
              stagger: 0.1,
              ease: 'back.out(1.7)',
            },
            '-=0.2',
          )

        timelineRef.current = tl

        return () => {
          timelineRef.current = null
        }
      })
    },
    { scope: containerRef },
  )

  const toggleMenu = () => {
    if (!timelineRef.current) return

    if (!isOpen) {
      timelineRef.current.timeScale(1).play()
    } else {
      timelineRef.current.timeScale(2).reverse()
    }
    setIsOpen(!isOpen)
  }

  const handleLinkClick = () => {
    if (isOpen && timelineRef.current) {
      timelineRef.current.timeScale(2).reverse()
      setIsOpen(false)
    }
  }

  return (
    <nav className="nav" ref={containerRef}>
      <Link href="/" className="logo" onClick={handleLinkClick}>
        {siteData?.siteLogo && <img src={siteData.siteLogo} alt={siteData.siteName || 'Logo'} />}
      </Link>

      <button className="toggle-nav" onClick={toggleMenu} aria-label="Toggle Navigation">
        <svg viewBox="0 0 100 100" width="200" height="200" className="humbergur-icon">
          <g stroke="#4790ff" strokeWidth="6" strokeLinecap="round">
            <line x1="25" y1="35" x2="75" y2="35" id="line-1" />
            <line x1="25" y1="50" x2="75" y2="50" id="line-2" />
            <line x1="25" y1="65" x2="75" y2="65" id="line-3" />
          </g>
        </svg>
      </button>

      <div className="nav-container">
        <ul className="nav-items">
          <li>
            <Link href="/posts" onClick={handleLinkClick}>
              discover
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={handleLinkClick}>
              about
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={handleLinkClick}>
              Contact
            </Link>
          </li>
          <li className="search-item">
            <NavbarSearch hideMobileNav={handleLinkClick} />
          </li>
        </ul>
      </div>
    </nav>
  )
}