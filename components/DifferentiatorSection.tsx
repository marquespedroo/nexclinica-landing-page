import React, { useEffect, useRef, useState } from 'react';
import { Zap, MessageSquare, Link, Shield, DollarSign, Sparkles } from 'lucide-react';

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

const DifferentiatorSection: React.FC = () => {
  const sectionReveal = useScrollReveal();

  const differentiators = [
    {
      icon: MessageSquare,
      title: 'CRM para WhatsApp nativo',
      desc: 'Construído do zero para funcionar perfeitamente com WhatsApp'
    },
    {
      icon: Link,
      title: 'Integração nativa',
      desc: 'Não dependemos de plataformas terceiras que encarecem e complicam'
    },
    {
      icon: Shield,
      title: 'LGPD by design',
      desc: 'Dados clínicos protegidos com acesso controlado e auditável'
    },
    {
      icon: DollarSign,
      title: 'Custo acessível',
      desc: 'Arquitetura otimizada que permite preços justos para clínicas menores'
    }
  ];

  return (
    <section
      id="diferenciais"
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

      {/* Glow Effect */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-brand-500/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium mb-6">
            <Sparkles className="w-3 h-3 inline mr-1" />
            Por Que Somos Diferentes
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.01em' }}
          >
            Não é mais um chatbot. É um ERP com inteligência de verdade.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Outras soluções do mercado oferecem chatbots genéricos que não entendem o contexto da sua clínica. Ou sistemas de gestão que não conversam com o WhatsApp. Ou integrações frágeis que quebram a todo momento.
          </p>
        </div>

        {/* Intro Text */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <p className="text-xl text-slate-900 dark:text-white font-semibold">
            A nexclinica nasceu <span className="text-brand-400">diferente</span>:
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {differentiators.map((diff, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-brand-500/30 hover:bg-white/80 dark:hover:bg-white/[0.07] transition-all duration-500 group ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <diff.icon className="w-7 h-7 text-brand-400" />
                </div>
                <div>
                  <h3 className="text-slate-900 dark:text-white font-semibold text-xl mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {diff.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{diff.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Statement */}
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-black/5 to-transparent dark:from-white/5 dark:to-transparent border border-black/10 dark:border-white/10">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Enquanto outros adaptam ferramentas genéricas,
            </p>
            <p className="text-2xl font-semibold text-slate-900 dark:text-white">
              nós construímos do zero para resolver o problema <span className="text-brand-400">de verdade</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferentiatorSection;
