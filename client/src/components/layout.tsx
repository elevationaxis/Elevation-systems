import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState, useEffect, ReactNode } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Free Audit", href: "/audit" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

import logoImage from '@assets/IMG_5053_1771177208965.jpg';

export function Layout({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
          isScrolled ? "bg-background/90 backdrop-blur-md border-border/10 py-3" : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 max-w-7xl flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3 no-underline cursor-pointer">
            <div className="relative flex items-center justify-center w-12 h-12">
              <img src={logoImage} alt="Elevation Axis Logo" className="w-full h-full object-contain" />
            </div>
            <span className="hidden sm:block text-xs font-semibold tracking-[0.2em] uppercase opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              Elevation Axis
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium tracking-wide uppercase transition-colors hover:text-accent",
                  location === item.href ? "text-foreground border-b border-foreground" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-4 inline-flex items-center justify-center rounded-none font-medium px-6 h-10 bg-primary text-primary-foreground hover:bg-primary/90 text-sm transition-colors"
            >
              Book a Call
            </Link>
          </nav>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center space-y-8 md:hidden animate-in fade-in duration-200">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="text-2xl font-serif text-foreground hover:text-accent transition-colors">
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-none w-full max-w-xs h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium transition-colors"
          >
            Book a Call
          </Link>
        </div>
      )}

      <main className="flex-grow pt-20">
        {children}
      </main>

      <footer className="bg-foreground text-background py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10">
                  <img src={logoImage} alt="Elevation Axis Logo" className="w-full h-full object-contain opacity-90 invert" />
                </div>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-background/80">
                  Elevation Axis
                </span>
              </div>
              <p className="text-background/60 max-w-xs font-light">
                We find where leads are leaking and seal the foundation. Growth systems for local businesses.
              </p>
            </div>

            <div>
              <h4 className="font-serif text-lg mb-4 text-background">Explore</h4>
              <ul className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-background/60 hover:text-background transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg mb-4 text-background">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:hello@elevationaxis.com" className="text-sm text-background/60 hover:text-background transition-colors">
                    hello@elevationaxis.com
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center text-xs text-background/40">
            <p>&copy; {new Date().getFullYear()} Elevation Axis. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-background">Privacy Policy</a>
              <a href="#" className="hover:text-background">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
