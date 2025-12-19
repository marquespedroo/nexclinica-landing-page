import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Solução', href: '#solucao' },
    { label: 'IA Conversacional', href: '#ia-conversacional' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Impacto', href: '#impacto' },
    { label: 'Dúvidas', href: '#faq' },
  ];

  const whatsappLink = 'https://wa.me/556191039745?text=Olá! Gostaria de saber mais sobre a Nexclinica.';

  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5 shadow-sm dark:shadow-none'
        : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20 relative">
          {/* Logo */}
          <a href="/" className="flex items-center group">
            <img
              src="/ALTERNATIVA.png"
              alt="Nexclinica Logo"
              className={`h-9 w-auto ${theme === 'dark' ? 'brightness-100' : 'brightness-0'}`}
            />
            <span className="text-xl font-bold dark:text-white text-slate-900 tracking-tight -ml-1">
              Nex<span className="text-brand-600 dark:text-brand-400">clinica</span>
            </span>
          </a>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-600 dark:bg-brand-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-700 dark:text-slate-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-brand-600 dark:bg-brand-500 hover:bg-brand-500 dark:hover:bg-brand-400 text-white dark:text-black text-sm font-bold rounded-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              Falar com Vendas
            </a>
          </div>

          {/* Mobile Menu Button & Theme Toggle (Mobile) */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-700 dark:text-slate-300"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-black/10 dark:border-white/10 bg-white dark:bg-black">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white transition-colors px-2 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-black/10 dark:border-white/10">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-brand-600 dark:bg-brand-500 hover:bg-brand-500 dark:hover:bg-brand-400 text-white dark:text-black text-sm font-bold rounded-lg transition-all text-center"
                >
                  Falar com Vendas
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
