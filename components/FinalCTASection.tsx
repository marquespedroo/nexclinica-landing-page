import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, ArrowRight, Sparkles } from 'lucide-react';

const useScrollReveal = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

const FinalCTASection: React.FC = () => {
  const sectionReveal = useScrollReveal();

  return (
    <section
      ref={sectionReveal.ref}
      className="relative py-32 bg-gradient-to-b from-white via-brand-50/30 to-white dark:from-black dark:via-brand-950/30 dark:to-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-500/20 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >
          {/* Badge */}
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium mb-8">
            <Sparkles className="w-3 h-3 inline mr-1" />
            Comece Agora
          </span>

          {/* Main Headline */}
          <h2
            className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.02em' }}
          >
            Pronto para transformar a gestão da sua clínica?
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Agende uma demonstração gratuita e veja a nexclinica funcionando na prática.
          </p>

          {/* CTA Button */}
          <div
            className={`text-center transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '300ms' }}
          >
            <a
              href="https://wa.me/556191039745?text=Olá! Gostaria de saber mais sobre a nexclinica."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-10 py-5 bg-brand-600 dark:bg-brand-500 hover:bg-brand-500 dark:hover:bg-brand-400 text-white dark:text-black text-lg font-bold rounded-xl transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(16,185,129,0.5)] inline-flex items-center gap-3"
            >
              <MessageCircle className="w-6 h-6" />
              Falar com Vendas
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Trust indicators */}
          <div
            className={`mt-12 flex flex-wrap items-center justify-center gap-8 text-slate-500 text-sm transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '500ms' }}
          >
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-400" />
              Demonstração gratuita
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-400" />
              Sem compromisso
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-400" />
              Suporte personalizado
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
