import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, Clock, Heart, Smile, Stethoscope, BarChart3 } from 'lucide-react';

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

const ImpactSection: React.FC = () => {
  const sectionReveal = useScrollReveal();

  const impacts = [
    {
      icon: TrendingUp,
      title: 'Aumentar o faturamento',
      stat: '30%',
      desc: 'em média'
    },
    {
      icon: Users,
      title: 'Mais atendimentos',
      stat: '30%',
      desc: 'com a mesma estrutura'
    },
    {
      icon: Clock,
      title: 'Reduzir filas',
      stat: '-',
      desc: 'tempos de espera e no-show'
    },
    {
      icon: Stethoscope,
      title: 'Continuidade',
      stat: '-',
      desc: 'Evitar interrupções de tratamento'
    },
    {
      icon: Smile,
      title: 'Menos estresse',
      stat: '-',
      desc: 'para equipes de recepção'
    },
    {
      icon: Heart,
      title: 'Atendimento humano',
      stat: '-',
      desc: 'porque a tecnologia cuida do resto'
    }
  ];

  return (
    <section
      id="impacto"
      ref={sectionReveal.ref}
      className="relative py-24 bg-gradient-to-b from-white via-brand-50/20 to-white dark:from-black dark:via-brand-950/20 dark:to-black overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-brand-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 right-0 w-[300px] h-[300px] bg-brand-500/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium mb-6">
            <BarChart3 className="w-3 h-3 inline mr-1" />
            Impacto
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.01em' }}
          >
            Mais pacientes atendidos. Melhor experiência para todos.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Cada consulta que deixa de ser perdida é um paciente que recebe cuidado no momento certo.
          </p>
        </div>

        {/* Intro Text */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <p className="text-xl text-slate-900 dark:text-white">
            A nexclinica ajuda clínicas a:
          </p>
        </div>

        {/* Impact Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {impacts.map((impact, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-brand-500/30 hover:bg-white/80 dark:hover:bg-white/[0.07] transition-all duration-500 group ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <impact.icon className="w-6 h-6 text-brand-400" />
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="text-slate-900 dark:text-white font-semibold text-lg" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {impact.title}
                    </h3>
                    {impact.stat !== '-' && (
                      <span className="text-brand-400 font-bold text-2xl">{impact.stat}</span>
                    )}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{impact.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          style={{ transitionDelay: '900ms' }}
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-brand-500/10 to-transparent border border-brand-500/20">
            <Heart className="w-10 h-10 text-brand-400 mx-auto mb-4" />
            <p className="text-2xl font-semibold text-slate-900 dark:text-white">
              Acreditamos que a tecnologia deve <span className="text-brand-400">ampliar</span> o acesso à saúde, não complicá-lo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
