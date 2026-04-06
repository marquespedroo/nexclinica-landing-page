import React, { Suspense, useEffect, useState } from 'react';
import { ArrowRight, MessageCircle, Calendar, Brain } from 'lucide-react';
import ParticleLogo from './ParticleLogo';

const heroFeatures = [
  {
    icon: Brain,
    title: 'IA 24/7',
    desc: 'Agendamento automático',
    fullTitle: 'Agentes de IA',
    fullDesc: 'IA conversacional que cuida de agendamentos e follow-ups.'
  },
  {
    icon: MessageCircle,
    title: 'CRM',
    desc: 'CRM de WhatsApp nativo',
    fullTitle: 'CRM Nativo',
    fullDesc: 'Todas as conversas em um só lugar com contexto.'
  },
  {
    icon: Calendar,
    title: 'Gestão',
    desc: 'Tudo integrado.',
    fullTitle: 'Gestão Unificada',
    fullDesc: 'Agenda, prontuário e finanças integrados.'
  }
];

const Hero: React.FC = () => {
  const [showParticleLogo, setShowParticleLogo] = useState(false);

  useEffect(() => {
    setShowParticleLogo(true);
  }, []);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-gradient-to-br from-brand-50 via-white to-white transition-colors duration-300 dark:from-black dark:via-black dark:to-black md:flex-row md:items-center">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-0 h-full w-full md:right-0 md:w-2/3 md:translate-x-[10%] md:-translate-y-[5%]">
          {showParticleLogo ? (
            <Suspense fallback={<div className="h-full w-full bg-transparent" />}>
              <ParticleLogo />
            </Suspense>
          ) : (
            <div className="relative h-full w-full">
              <div className="absolute inset-[12%] rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-500/10" />
              <div className="absolute left-1/2 top-1/2 h-[50%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-200/40 dark:border-white/10" />
            </div>
          )}
        </div>
      </div>

      <div className="pointer-events-none relative z-10 container mx-auto flex h-full items-center justify-center px-4 pb-24 pt-24 md:justify-start md:px-12 md:pb-8">
        <div className="w-full max-w-sm rounded-[2.5rem] border border-white/10 bg-white/5 p-6 text-center shadow-2xl backdrop-blur-md md:max-w-3xl md:border-none md:bg-transparent md:p-0 md:text-left md:shadow-none md:backdrop-blur-none">
          <div className="transition-all duration-500">
            <h1
              className="mb-4 max-w-2xl text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:mb-6 md:text-5xl lg:text-7xl"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.02em' }}
            >
              <span>O Futuro da sua </span>
              <span className="text-brand-600 dark:text-brand-400">Clínica</span>
              <span> Chegou</span>
            </h1>
          </div>

          <div className="transition-all duration-500">
            <p
              className="mx-auto mb-8 max-w-lg text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-200 md:mx-0 md:mb-10 md:text-lg md:font-normal"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Gestão unificada, CRM de WhatsApp nativo e o futuro dos assistentes de IA em um só lugar.
            </p>
          </div>

          <div className="md:max-w-3xl">
            <div className="mb-12 transition-all duration-500 md:mb-16">
              <div className="pointer-events-auto flex flex-col items-center justify-center gap-4 sm:flex-row md:items-start md:justify-start">
                <a
                  href="https://wa.me/556191039745?text=Olá! Gostaria de saber mais sobre a nexclinica."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-8 py-3.5 text-sm font-bold text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] transition-all hover:scale-105 hover:bg-brand-500 dark:bg-brand-500 dark:text-black dark:hover:bg-brand-400 sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  Falar com Vendas
                </a>
                <a
                  href="#solucao"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/20 px-8 py-3.5 text-sm font-semibold text-slate-900 transition-all hover:bg-white/30 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 sm:w-auto"
                >
                  Conhecer Mais
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="w-full transition-all duration-500">
              <div className="mb-5 block h-px w-full bg-gradient-to-r from-transparent via-slate-400/30 to-transparent md:hidden" />

              <div className="grid grid-cols-3 gap-3 text-left md:gap-6">
                {heroFeatures.map((feature) => (
                  <div
                    key={feature.fullTitle}
                    className="group flex flex-col items-center rounded-2xl bg-transparent p-2 text-center transition-all hover:md:-translate-y-1 hover:md:bg-white/60 hover:md:shadow-xl hover:md:shadow-black/5 dark:hover:md:bg-white/10 md:items-start md:border md:border-black/[0.03] md:bg-white/40 md:p-5 md:text-left md:backdrop-blur-sm md:dark:border-white/[0.05] md:dark:bg-white/5"
                  >
                    <div className="mb-3 rounded-xl bg-brand-100/50 p-2 dark:bg-white/10 md:mb-4 md:rounded-lg md:bg-brand-50 md:p-2.5 md:dark:bg-white/10">
                      <feature.icon className="h-5 w-5 text-brand-700 transition-transform group-hover:scale-110 dark:text-brand-300 md:h-6 md:w-6 md:text-brand-600 md:dark:text-brand-400" />
                    </div>

                    <div className="block md:hidden">
                      <h3 className="mb-1 text-[11px] font-bold leading-tight text-slate-900 dark:text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {feature.title}
                      </h3>
                      <p className="text-[9px] leading-tight text-slate-600 opacity-90 dark:text-slate-300">{feature.desc}</p>
                    </div>

                    <div className="hidden md:block">
                      <h3 className="mb-2 text-sm font-bold tracking-tight text-slate-900 dark:text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {feature.fullTitle}
                      </h3>
                      <p className="text-xs leading-relaxed text-slate-600 opacity-80 dark:text-slate-400">{feature.fullDesc}</p>
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
