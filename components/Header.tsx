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

  const whatsappLink = 'https://wa.me/556191039745?text=Olá! Gostaria de saber mais sobre a nexclinica.';

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
              alt="nexclinica Logo"
              className={`h-9 w-auto ${theme === 'dark' ? 'brightness-100' : 'brightness-0'}`}
            />
            <span className="text-xl font-bold dark:text-white text-slate-900 tracking-tight -ml-1">
              nex<span className="text-brand-600 dark:text-brand-400">clinica</span>
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
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-700 dark:text-slate-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a
              href="http://app.nexclinica.com.br/"
              className="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Entrar
            </a>
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

        {/* Mobile Menu - Glassmorphic Floating Card */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-[calc(100%-8px)] left-4 right-4 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className={`p-6 bg-white/10 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-[2rem] shadow-2xl overflow-hidden`}>
              <nav className="flex flex-col gap-5">
                {navItems.map((item, i) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-base font-semibold text-slate-800 dark:text-slate-100 hover:text-brand-600 dark:hover:text-brand-400 transition-all px-2 py-1 transform hover:translate-x-1"
                    style={{ transitionDelay: `${i * 50}ms` }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}

                <div className="flex flex-col gap-3 mt-4 pt-6 border-t border-black/5 dark:border-white/10">
                  <a
                    href="http://app.nexclinica.com.br/"
                    className="px-5 py-3.5 bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/10 text-slate-900 dark:text-white text-sm font-bold rounded-xl transition-all text-center hover:bg-white/30"
                  >
                    Entrar
                  </a>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 bg-brand-600 dark:bg-brand-500 text-white dark:text-black text-sm font-bold rounded-xl transition-all text-center shadow-[0_4px_14px_0_rgba(16,185,129,0.39)]"
                  >
                    Falar com Vendas
                  </a>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
