import React, { useEffect, useRef, useState } from 'react';
import { Check, X, Minus } from 'lucide-react';

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

const ComparisonSection: React.FC = () => {
  const sectionReveal = useScrollReveal();

  const comparisonData = [
    {
      feature: 'Código próprio',
      competitor: null,
      nexclinica: true,
    },
    {
      feature: 'Controle total',
      competitor: null,
      nexclinica: true,
    },
    {
      feature: 'Segurança',
      competitor: null,
      nexclinica: true,
    },
    {
      feature: 'Agendamento + prontuário + financeiro + faturamento',
      competitor: null,
      nexclinica: true,
    },
    {
      feature: 'Sistema Completo + CRM de WhatsApp nativo',
      competitor: null,
      nexclinica: true,
    },
    {
      feature: 'Custo por Atendimento',
      competitor: 'Alto e IMPREVISÍVEL',
      nexclinica: 'Baixo e PREVISÍVEL',
      isText: true,
    },
    {
      feature: 'Confiabilidade dos Assistentes de IA',
      competitor: 'baixa',
      nexclinica: 'MUITO ALTA',
      isText: true,
    },
  ];

  return (
    <section
      ref={sectionReveal.ref}
      className="relative min-h-screen bg-gradient-to-b from-brand-50 via-white to-brand-50/50 dark:bg-black dark:from-black dark:via-black dark:to-black py-24 overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium mb-6">
            Comparativo
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.01em' }}
          >
            Nossos diferenciais
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Veja como a nexclinica se destaca em relação às soluções tradicionais do mercado.
          </p>
        </div>

        {/* Comparison Table */}
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
          <div className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 backdrop-blur-xl">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-white/40 dark:bg-white/5">
              <div className="p-4 md:p-6">
                <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">Funcionalidade</span>
              </div>
              <div className="p-4 md:p-6 text-center border-l border-white/10">
                <span className="text-slate-400 text-sm font-medium">Concorrência</span>
              </div>
              <div className="p-4 md:p-6 text-center border-l border-brand-500/30 bg-brand-500/5 dark:bg-brand-500/10">
                <span className="text-brand-400 text-sm font-bold">nexclinica</span>
              </div>
            </div>

            {/* Table Rows */}
            {comparisonData.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 border-t border-black/10 dark:border-white/10 transition-all duration-500 ${sectionReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                {/* Feature Name */}
                <div className="p-4 md:p-6 flex items-center">
                  <span className="text-slate-900 dark:text-white text-sm font-medium">{row.feature}</span>
                </div>

                {/* Competitor */}
                <div className="p-4 md:p-6 flex items-center justify-center border-l border-black/10 dark:border-white/10">
                  {row.isText ? (
                    <span className="text-slate-600 dark:text-slate-400 text-sm text-center">{row.competitor}</span>
                  ) : row.competitor === null ? (
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700/50 flex items-center justify-center">
                      <Minus className="w-4 h-4 text-slate-500" />
                    </div>
                  ) : row.competitor ? (
                    <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-brand-400" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                      <X className="w-4 h-4 text-red-400" />
                    </div>
                  )}
                </div>

                {/* nexclinica */}
                <div className="p-4 md:p-6 flex items-center justify-center border-l border-brand-500/30 bg-brand-500/5">
                  {row.isText ? (
                    <span className="text-brand-400 text-sm font-semibold text-center">{row.nexclinica}</span>
                  ) : row.nexclinica ? (
                    <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                      <Check className="w-5 h-5 text-white" strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <X className="w-5 h-5 text-red-400" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '800ms' }}>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
            Pronto para transformar a gestão da sua clínica?
          </p>
          <a
            href="https://wa.me/556191039745?text=Olá! Gostaria de saber mais sobre a nexclinica."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-brand-600 dark:bg-brand-500 hover:bg-brand-500 dark:hover:bg-brand-400 text-white dark:text-black font-bold rounded-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
          >
            Falar com Vendas
          </a>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
