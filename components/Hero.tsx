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
  // We remove useScrollReveal for the main Hero elements because they are at the top
  // and should follow the main cinematic entrance sequence instead of scroll triggers.
  const featuresReveal = useScrollReveal(); // Keeping this for the feature icons potentially

  // Entrance Animation States
  const [logoReady, setLogoReady] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Stabilize the ready signal to prevent hydration/mount flicker cycles
  const handleLogoReady = React.useCallback(() => {
    setLogoReady(true);
  }, []);

  useEffect(() => {
    // We only start the content timer ONCE the logo has signaled it is rendered
    if (logoReady) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 1000); // 1s delay after logo is ready for a tight, professional feel
      return () => clearTimeout(timer);
    }
  }, [logoReady]);

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row md:items-center bg-gradient-to-br from-brand-50 via-white to-white dark:bg-black dark:from-black dark:via-black dark:to-black overflow-hidden transition-colors duration-300">

      {/* 3D Particle Layer - Background for Mobile, Side for Desktop */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 w-full h-full md:w-2/3 md:right-0 md:translate-x-[10%] md:-translate-y-[5%]">
          {/* Mobile Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-transparent dark:from-black/80 dark:via-black/50 dark:to-transparent z-10 md:hidden pointer-events-none" />

          <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-brand-500 bg-transparent"></div>}>
            <ParticleLogo onReady={handleLogoReady} />
          </Suspense>
        </div>
      </div>

      {/* Content Layer - Responsive Alignment */}
      <div className="relative z-10 container mx-auto px-4 md:px-12 pointer-events-none pt-24 pb-24 md:pb-8 h-full flex items-center justify-center md:justify-start">
        {/* Glass Card Container - Strictly Coordinated Entrance */}
        {/* We apply 'hero-initial-hide' to ensure the browser engine hides it BEFORE scripts load */}
        <div className={`w-full max-w-sm md:max-w-3xl text-center md:text-left 
                        md:bg-transparent md:backdrop-blur-none md:border-none md:shadow-none md:p-0 
                        bg-white/5 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-[2.5rem] p-6 shadow-2xl
                        transition-all duration-1000 
                        ${showContent ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-12 invisible hero-initial-hide'}`}>

          {/* Main Headline - Kinetic Typography */}
          <div className={`transition-all duration-1000 delay-100 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1
              className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-4 md:mb-6 max-w-2xl"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.02em' }}
            >
              <span className="text-slate-900 dark:text-white">O Futuro da sua </span>
              <span className="text-brand-600 dark:text-brand-400">Clínica</span>
              <span className="text-slate-900 dark:text-white"> Chegou</span>
            </h1>
          </div>

          {/* Subheadline */}
          <div className={`transition-all duration-1000 delay-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p
              className="text-sm md:text-lg text-slate-700 dark:text-slate-200 mb-8 md:mb-10 font-medium md:font-normal max-w-lg mx-auto md:mx-0 leading-relaxed"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Gestão unificada, CRM de WhatsApp nativo e o futuro dos assistentes de IA em um só lugar.
            </p>
          </div>

          {/* Desktop Content Alignment Wrapper - Ensures shared axis for Buttons and Grid */}
          <div className="md:max-w-3xl">
            {/* CTA Buttons */}
            <div className={`mb-12 md:mb-16 transition-all duration-1000 delay-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div
                className={`flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4 pointer-events-auto`}
              >
                <a
                  href="https://wa.me/556191039745?text=Olá! Gostaria de saber mais sobre a nexclinica."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto group relative px-8 py-3.5 bg-brand-600 dark:bg-brand-500 hover:bg-brand-500 dark:hover:bg-brand-400 text-white dark:text-black text-sm font-bold rounded-xl transition-all transform hover:scale-105 shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Falar com Vendas
                </a>
                <a
                  href="#solucao"
                  className="w-full sm:w-auto px-8 py-3.5 bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 backdrop-blur-md border border-white/20 dark:border-white/10 text-slate-900 dark:text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  Conhecer Mais
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Feature Grid - Coordinated Alignment & distinctive gap */}
            <div className={`w-full transition-all duration-1000 delay-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {/* Divider for Mobile */}
              <div className="block md:hidden w-full h-px bg-gradient-to-r from-transparent via-slate-400/30 to-transparent mb-5"></div>

              <div
                className={`grid grid-cols-3 gap-3 md:gap-6 text-left`}
              >
                {[
                  {
                    icon: Brain,
                    title: "IA 24/7",
                    desc: "Agendamento automático",
                    fullTitle: "Agentes de IA",
                    fullDesc: "IA conversacional que cuida de agendamentos e follow-ups."
                  },
                  {
                    icon: MessageCircle,
                    title: "CRM",
                    desc: "CRM de Whatsapp nativo",
                    fullTitle: "CRM Nativo",
                    fullDesc: "Todas as conversas em um só lugar com contexto."
                  },
                  {
                    icon: Calendar,
                    title: "Gestão",
                    desc: "Tudo integrado.",
                    fullTitle: "Gestão Unificada",
                    fullDesc: "Agenda, prontuário e finanças integrados."
                  }
                ].map((feature, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center md:items-start text-center md:text-left 
                                p-2 md:p-5 rounded-2xl
                                md:bg-white/40 md:dark:bg-white/5 bg-transparent 
                                md:border md:border-black/[0.03] md:dark:border-white/[0.05] 
                                md:backdrop-blur-sm 
                                transition-all pointer-events-auto group transform
                                hover:md:bg-white/60 dark:hover:md:bg-white/10 hover:md:shadow-xl hover:md:shadow-black/5 hover:md:-translate-y-1`}
                  >
                    <div className={`p-2 rounded-xl bg-brand-100/50 dark:bg-white/10 md:bg-brand-50 md:dark:bg-white/10 md:p-2.5 md:rounded-lg mb-3 md:mb-4`}>
                      <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-brand-700 dark:text-brand-300 md:text-brand-600 md:dark:text-brand-400 group-hover:scale-110 transition-transform" />
                    </div>

                    {/* Mobile View: Compact */}
                    <div className="block md:hidden">
                      <h3 className="text-slate-900 dark:text-white font-bold text-[11px] leading-tight mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{feature.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300 text-[9px] leading-tight opacity-90">{feature.desc}</p>
                    </div>

                    {/* Desktop View: Full */}
                    <div className="hidden md:block">
                      <h3 className="text-slate-900 dark:text-white font-bold mb-2 text-sm tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>{feature.fullTitle}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed opacity-80">{feature.fullDesc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
