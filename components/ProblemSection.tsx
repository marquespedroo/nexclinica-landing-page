import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, Clock, CalendarX, Users } from 'lucide-react';

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

const ProblemSection: React.FC = () => {
  const sectionReveal = useScrollReveal();
  const statsReveal = useScrollReveal(0.3);

  const painPoints = [
    {
      icon: Clock,
      stat: '33%',
      text: 'dos pacientes tentam agendar fora do horário comercial — e não recebem resposta'
    },
    {
      icon: CalendarX,
      stat: '30%',
      text: 'das consultas terminam em falta, deixando buracos na agenda e dinheiro na mesa'
    },
    {
      icon: Users,
      stat: 'Horas',
      text: 'perdidas confirmando consultas, reagendando e cobrando — em vez de cuidar de quem está na clínica'
    }
  ];

  return (
    <section
      ref={sectionReveal.ref}
      className="relative min-h-screen bg-gradient-to-b from-white via-red-50 to-white dark:from-black dark:via-red-950/10 dark:to-black py-24 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-6">
            <AlertTriangle className="w-3 h-3 inline mr-1" />
            O Problema
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.01em' }}
          >
            Sua clínica ainda funciona assim?
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Agenda em um sistema. Prontuário em outro. Financeiro em planilha. WhatsApp lotado de mensagens que ninguém consegue responder a tempo.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div
          ref={statsReveal.ref}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {painPoints.map((point, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-red-500/10 backdrop-blur-sm hover:border-red-500/30 transition-all duration-500 group ${statsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <point.icon className="w-6 h-6 text-red-400" />
                </div>
                <span className="text-3xl font-bold text-red-400">{point.stat}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{point.text}</p>
            </div>
          ))}
        </div>

        {/* Emotional Hook */}
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${statsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-black/5 to-transparent dark:from-white/5 dark:to-transparent border border-black/10 dark:border-white/10">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Você sente que trabalha mais, mas os resultados não acompanham.
            </p>
            <p className="text-2xl font-semibold text-slate-900 dark:text-white">
              O problema não é falta de esforço. É falta de <span className="text-red-400">integração</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
