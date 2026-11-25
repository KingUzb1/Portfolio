import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Language } from '../types/portfolio';

interface NavbarProps {
  brandName: string;
  lang: Language;
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ brandName, lang, onContactClick }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks =
    lang === 'uz'
      ? [
          { href: '#ishlar', label: 'Ishlarim' },
          { href: '#haqida', label: 'Haqida' },
          { href: '#konikmalar', label: "Ko'nikmalar" },
        ]
      : [
          { href: '#ishlar', label: 'Works' },
          { href: '#haqida', label: 'About' },
          { href: '#konikmalar', label: 'Skills' },
        ];

  const ctaLabel = lang === 'uz' ? "Bog'lanish" : 'Contact';

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 dark:bg-[#09090B]/90 backdrop-blur-md border-b border-black/[0.07] dark:border-white/[0.08]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        <a
          href="#top"
          className="font-display text-xl font-bold tracking-tight text-[#141413] dark:text-[#F4F4F5] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9381E] rounded-sm"
        >
          {brandName}
        </a>

        <nav
          aria-label={lang === 'uz' ? 'Asosiy navigatsiya' : 'Primary navigation'}
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#575652] dark:text-[#A1A1AA]"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 hover:text-[#141413] dark:hover:text-[#F4F4F5] transition-colors duration-150 whitespace-nowrap shrink-0 after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-[#D9381E] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onContactClick}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-[#141413] dark:bg-[#F4F4F5] dark:text-[#09090B] rounded-lg hover:bg-[#D9381E] dark:hover:bg-[#D9381E] dark:hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9381E]"
          >
            {ctaLabel}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-black/[0.07] dark:border-white/[0.08] bg-[#FAF9F6] dark:bg-[#09090B] px-5 py-5">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-base font-medium text-[#141413] dark:text-[#F4F4F5] border-b border-black/[0.05] dark:border-white/[0.06]"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onContactClick();
              }}
              className="mt-2 w-full py-3 px-4 text-sm font-medium text-white bg-[#D9381E] rounded-lg cursor-pointer"
            >
              {ctaLabel}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
