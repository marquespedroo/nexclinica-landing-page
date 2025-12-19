import React, { useEffect, useRef, useState } from 'react';
import { Building2, Users, User, MessageCircle, Settings, Target, TrendingUp } from 'lucide-react';

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

const TargetAudienceSection: React.FC = () => {
  const sectionReveal = useScrollReveal();

  const audiences = [
    {
      icon: Building2,
      title: 'Clínicas médicas e de terapias',
      desc: 'Fisioterapia, fonoaudiologia, psicologia e mais'
    },
    {
      icon: Users,
      title: 'Clínicas de todos os portes',
      desc: 'Do consultório individual à rede de clínicas'
    },
    {
      icon: User,
      title: 'Profissionais liberais',
      desc: 'Médicos, terapeutas autônomos'
    },
    {
      icon: MessageCircle,
      title: 'Clínicas que usam WhatsApp',
      desc: 'Para se comunicar com pacientes'
    },
    {
      icon: Settings,
      title: 'Gestores que querem mais controle',
      desc: 'E menos trabalho operacional'
    },
    {
      icon: TrendingUp,
      title: 'Clínicas em crescimento',
      desc: 'Que buscam escalar sem perder qualidade'
    }
  ];

  return (
    <section
      ref={sectionReveal.ref}
      className="relative py-24 bg-gradient-to-b from-white via-brand-50/20 to-white dark:from-black dark:via-brand-950/10 dark:to-black overflow-hidden"
    >
      {/* Background Pattern */}
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
            <Target className="w-3 h-3 inline mr-1" />
            Para Quem É
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.01em' }}
          >
            Feito para clínicas que querem crescer sem aumentar a equipe
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            A nexclinica é ideal para:
          </p>
        </div>

        {/* Audience Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {audiences.map((audience, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-brand-500/30 hover:bg-white/80 dark:hover:bg-white/[0.07] transition-all duration-500 group ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <audience.icon className="w-6 h-6 text-brand-400" />
                </div>
                <div>
                  <h3 className="text-slate-900 dark:text-white font-semibold text-lg mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {audience.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{audience.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-brand-500/10 to-transparent border border-brand-500/20">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Se você sente que sua clínica poderia atender mais pacientes, faturar mais e trabalhar de forma mais organizada —
            </p>
            <p className="text-2xl font-semibold text-slate-900 dark:text-white">
              a <span className="text-brand-400">nexclinica</span> foi feita para você.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
