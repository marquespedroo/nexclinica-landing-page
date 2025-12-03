import React, { Suspense, useEffect, useRef, useState } from 'react';
import { ArrowRight, MessageCircle, Calendar, Brain } from 'lucide-react';
import ParticleLogo from './ParticleLogo';

// Animation hook for scroll-triggered reveals
const useScrollReveal = (threshold = 0.1) => {
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

const Hero: React.FC = () => {
  const headlineReveal = useScrollReveal();
  const subheadlineReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row md:items-center bg-gradient-to-br from-brand-950/40 via-black to-black overflow-hidden">

      {/* 3D Particle Layer - Hidden on mobile (shown below), positioned right on desktop */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <div className="absolute top-0 right-0 w-2/3 h-full translate-x-[10%] -translate-y-[5%]">
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-brand-500 bg-transparent"></div>}>
            <ParticleLogo />
          </Suspense>
        </div>
      </div>

      {/* Content Layer - Aligned to the left */}
      <div className="relative z-10 container mx-auto px-5 md:px-12 pointer-events-none pt-20 md:pt-24 pb-6 md:pb-8 md:h-full flex items-center">
        <div className="max-w-xl text-left">

          {/* Main Headline - Kinetic Typography */}
          <div ref={headlineReveal.ref}>
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 transition-all duration-700 ${
                headlineReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '200ms', fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.02em' }}
            >
              <span className="text-white">O Futuro da sua </span>
              <span className="text-brand-400">Clínica</span>
              <span className="text-white"> Chegou</span>
            </h1>
          </div>

          {/* Subheadline */}
          <div ref={subheadlineReveal.ref}>
            <p
              className={`text-base md:text-lg text-slate-300 mb-6 max-w-lg leading-relaxed transition-all duration-700 ${
                subheadlineReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: '500ms', fontFamily: "'Montserrat', sans-serif" }}
            >
              Gestão unificada, CRM de WhatsApp nativo e o futuro dos assistentes de IA em um só lugar. Seus assistentes de IA trabalham enquanto você dorme.
            </p>
          </div>

          {/* CTA Buttons */}
          <div ref={ctaReveal.ref}>
            <div
              className={`flex flex-col sm:flex-row items-start gap-3 pointer-events-auto transition-all duration-700 ${
                ctaReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <a
                href="https://wa.me/556191039745?text=Olá! Gostaria de saber mais sobre a Nexclinica."
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 py-3 bg-brand-500 hover:bg-brand-400 text-black text-sm font-bold rounded-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Falar com Vendas
              </a>
              <a
                href="#solucao"
                className="px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-2"
              >
                Conhecer Mais
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Feature Grid - Nexclinica Specific */}
          <div ref={featuresReveal.ref}>
            <div
              className={`grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 md:mt-10 text-left transition-all duration-700 ${
                featuresReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              {[
                {
                  icon: Brain,
                  title: "Agentes de IA",
                  desc: "IA conversacional que cuida de agendamentos, confirmações e follow-ups 24/7."
                },
                {
                  icon: MessageCircle,
                  title: "CRM WhatsApp Nativo",
                  desc: "Todas as conversas dos pacientes em um só lugar, com contexto e histórico."
                },
                {
                  icon: Calendar,
                  title: "Gestão Unificada",
                  desc: "Agenda, prontuário e finanças integrados em uma única plataforma."
                }
              ].map((feature, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm hover:border-brand-500/30 hover:bg-white/[0.07] transition-all pointer-events-auto group transform ${
                    featuresReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${900 + i * 100}ms`, transitionDuration: '500ms' }}
                >
                  <feature.icon className="w-6 h-6 text-brand-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-semibold mb-1 text-xs" style={{ fontFamily: "'Montserrat', sans-serif" }}>{feature.title}</h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Particle Section - Shown only on mobile as its own section */}
      <div className="relative z-10 w-full h-[50vh] md:hidden">
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-brand-500 bg-transparent"></div>}>
          <ParticleLogo />
        </Suspense>
      </div>
    </div>
  );
};

export default Hero;
