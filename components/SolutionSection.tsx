import React, { useEffect, useRef, useState } from 'react';
import { Calendar, FileText, DollarSign, Sparkles, MessageCircle } from 'lucide-react';

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

const SolutionSection: React.FC = () => {
  const sectionReveal = useScrollReveal();
  const featuresReveal = useScrollReveal(0.3);

  const features = [
    {
      icon: Calendar,
      title: 'Agenda inteligente',
      desc: 'Visualize, organize e otimize seus horários com facilidade'
    },
    {
      icon: FileText,
      title: 'Prontuário eletrônico',
      desc: 'Histórico completo do paciente, sempre acessível'
    },
    {
      icon: DollarSign,
      title: 'Financeiro integrado',
      desc: 'Controle de pagamentos, cobranças e faturamento'
    }
  ];

  return (
    <section
      id="solucao"
      ref={sectionReveal.ref}
      className="relative min-h-screen bg-gradient-to-b from-black via-brand-950/20 to-black py-24 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium mb-6">
            <Sparkles className="w-3 h-3 inline mr-1" />
            A Solução
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.01em' }}
          >
            Nexclinica: o sistema que conecta tudo — e ainda responde seus pacientes por você.
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            A Nexclinica é um ERP completo feito especialmente para clínicas médicas. Em uma única plataforma, você gerencia:
          </p>
        </div>

        {/* Features Grid */}
        <div
          ref={featuresReveal.ref}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {features.map((feature, i) => (
            <div
              key={i}
              className={`p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-brand-500/30 hover:bg-white/[0.07] transition-all duration-500 group ${
                featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-brand-400" />
              </div>
              <h3 className="text-white font-semibold text-xl mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* WhatsApp Differentiator */}
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
            featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-brand-500/10 to-transparent border border-brand-500/20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MessageCircle className="w-8 h-8 text-brand-400" />
              <span className="text-brand-400 text-lg font-semibold">WhatsApp</span>
            </div>
            <p className="text-2xl font-semibold text-white">
              Mas o grande diferencial está no que acontece no <span className="text-brand-400">WhatsApp</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
