"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services", dropdownItems: [{ name: "Production", href: "/services#production" }] },
    { name: "Work", href: "/work" },
    { name: "About Us", href: "/about" },
    { name: "Case Studies", href: "/case-studies", dropdownItems: [{ name: "Testimonial", href: "/case-studies#testimonial" }] },
    { name: "Contact us", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 flex justify-center mt-6 ${
        scrolled ? "px-6" : "px-0"
      }`}
    >
      <div className={`w-full transition-all duration-500 ${scrolled ? 'max-w-5xl rounded-full bg-secondary-surface/70 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5),_0_0_20px_rgba(59,130,246,0.1)] py-3 px-8' : 'container mx-auto bg-transparent py-4 px-6'}`}>
        <div className="flex justify-between items-center">
        <Link href="/" className="text-2xl font-heading font-bold tracking-tight text-white">
          Upmark<span className="text-accent-blue">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div key={link.href} className="relative group">
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-white flex items-center gap-1 ${
                  pathname === link.href ? "text-white" : "text-muted-text"
                }`}
              >
                {link.name}
                {link.dropdownItems && <ChevronDown size={14} />}
              </Link>

              {/* Dropdown Menu */}
              {link.dropdownItems && (
                <div className="absolute top-full left-0 mt-4 min-w-[200px] w-auto bg-secondary-surface border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2 flex flex-col gap-1">
                  {link.dropdownItems.map((item) => (
                    <Link key={item.href} href={item.href} className="px-4 py-2 hover:bg-white/5 rounded-md text-sm text-muted-text hover:text-white whitespace-nowrap">
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full bg-primary-bg border-b border-white/10 shadow-2xl md:hidden flex flex-col items-center py-6 gap-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium ${
                  pathname === link.href ? "text-white" : "text-muted-text"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
