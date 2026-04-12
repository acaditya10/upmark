import Link from "next/link";

const TwitterIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-primary-bg pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-heading font-bold tracking-tight text-white mb-6 inline-block">
              Upmark<span className="text-accent-blue">.</span>
            </Link>
            <p className="text-muted-text/80 text-sm leading-relaxed max-w-xs">
              Integrated marketing that moves markets. Strategy, production and execution — unified.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold font-heading mb-6 tracking-wide">Services</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/services" className="text-muted-text hover:text-accent-blue transition-colors text-sm">Marketing Strategy</Link></li>
              <li><Link href="/services" className="text-muted-text hover:text-accent-blue transition-colors text-sm">Performance Marketing</Link></li>
              <li><Link href="/services" className="text-muted-text hover:text-accent-blue transition-colors text-sm">Content Production</Link></li>
              <li><Link href="/services" className="text-muted-text hover:text-accent-blue transition-colors text-sm">SEO & Lead Generation</Link></li>
              <li><Link href="/services" className="text-muted-text hover:text-accent-blue transition-colors text-sm">Video & Reels</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold font-heading mb-6 tracking-wide">Company</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="text-muted-text hover:text-accent-blue transition-colors text-sm">About</Link></li>
              <li><Link href="/work" className="text-muted-text hover:text-accent-blue transition-colors text-sm">Work</Link></li>
              <li><Link href="/process" className="text-muted-text hover:text-accent-blue transition-colors text-sm">Process</Link></li>
              <li><Link href="/contact" className="text-muted-text hover:text-accent-blue transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold font-heading mb-6 tracking-wide">Connect</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="#" className="flex items-center gap-2 text-muted-text hover:text-accent-blue transition-colors text-sm">
                  <TwitterIcon size={16} /> Twitter / X
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-muted-text hover:text-accent-blue transition-colors text-sm">
                  <LinkedinIcon size={16} /> LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-muted-text hover:text-accent-blue transition-colors text-sm">
                  <InstagramIcon size={16} /> Instagram
                </a>
              </li>
              <li className="pt-2 mt-2 border-t border-white/5">
                <a href="mailto:hello@upmark.co" className="text-muted-text hover:text-accent-blue transition-colors text-sm font-medium">
                  hello@upmark.co
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-text/60 text-xs text-center md:text-left">
            © 2026 Upmark. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-muted-text/60 hover:text-white transition-colors text-xs">Privacy Policy</Link>
            <Link href="/terms" className="text-muted-text/60 hover:text-white transition-colors text-xs">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
