import Link from "next/link";

const footerLinks = [
  { href: "/rooms", label: "Rooms" },
  { href: "/experience", label: "Experience" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <Link href="/" className="site-footer-logo">
            Rocca Mare
          </Link>
          <p className="site-footer-line">Stone, sea, and stillness.</p>
        </div>

        <nav className="site-footer-nav" aria-label="Footer navigation">
          <span className="type-label site-footer-label">Explore</span>
          <ul className="site-footer-list">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="site-footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer-contact">
          <span className="type-label site-footer-label">Reserve</span>
          <a href="mailto:hello@roccamare.com" className="site-footer-link">
            hello@roccamare.com
          </a>
          <a href="tel:+33000000000" className="site-footer-link">
            +33 0 00 00 00 00
          </a>
        </div>

        <div className="site-footer-location">
          <span className="type-label site-footer-label">Location</span>
          <p>Mediterranean coast</p>
          <Link href="/contact" className="site-footer-small-link">
            Arrival details
          </Link>
        </div>
      </div>

      <div className="site-footer-bottom">
        <span>© 2026 Rocca Mare Resort</span>
        <Link href="/contact" className="site-footer-small-link">
          Plan your stay
        </Link>
      </div>
    </footer>
  );
}
