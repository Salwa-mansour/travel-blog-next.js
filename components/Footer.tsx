import Link from 'next/link'
import { getSiteSettings } from '@/actions/actions'
import '@/css/footer.css' // Import your external stylesheet

export default async function Footer() {
  const siteData = await getSiteSettings()

  return (
    <footer className="footer">
      {/* Upper Footer */}
      <div className="footer-top-section">
        <div className="footer-brand-column">
          <Link href="/" className="footer-logo-wrapper">
            {siteData.siteLogo && (
              <img src={siteData.siteLogo} alt={siteData.siteName} className="footer-logo" />
            )}
          </Link>
          <p className="footer-tagline">{siteData.footerParagraph}</p>
        </div>

        <div className="footer-links-group">
          {/* Navigation Card */}
          <h6 className="footer-heading">Explore ⚡</h6>
          <div className="footer-card-column">
            <Link href="/posts" className="footer-link">discover</Link>
            <Link href="/about" className="footer-link">about</Link>
            <Link href="/contact" className="footer-link">contact</Link>
          </div>

          {/* Social Card (Commented out in your original code, kept ready here) */}
          {/* <div className="footer-card-column">
            <span className="footer-heading">Hang Out ✌️</span>
            <a href="#" className="footer-link">twitter / x</a>
            <a href="#" className="footer-link">github</a>
            <a href="#" className="footer-link">
              linkedin <span className="footer-badge">NEW</span>
            </a>
          </div> */}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom-section">
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} {siteData.siteName}. Crafted with 💙 by{' '}
          <a href="https://salwamansour.netlify.app/" className="footer-author-link">
            Muttajah
          </a>
          .
        </p>

        <div className="footer-legal-links">
          <Link href="/privacy-policy" className="footer-link">privacy policy</Link>
          <Link href="/terms-of-service" className="footer-link">terms of service</Link>
        </div>
      </div>
    </footer>
  )
}