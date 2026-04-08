import React from 'react';
import { Building2, Calendar, DollarSign, FileText, MessageCircle, Monitor, Shield, Sparkles, Users } from 'lucide-react';
import { useScrollReveal } from './useScrollReveal';

const businessFacts = [
  {
    icon: Building2,
    title: 'Empresa brasileira',
    desc: 'A Nexclinica é uma startup baseada em Brasília/DF, focada em software para clínicas e profissionais de saúde.'
  },
  {
    icon: Monitor,
    title: 'Modelo digital',
    desc: 'O produto funciona pela web, direto no navegador, sem instalação local e com acesso por assinatura.'
  },
  {
    icon: Users,
    title: 'Feita para clínicas',
    desc: 'Clínicas que precisam automatizar agenda, atendimento, prontuário, financeiro e relacionamento com pacientes.'
  }
];

const productPillars = [
  {
    icon: Calendar,
    title: 'Agenda inteligente',
    desc: 'Organização de horários, confirmações e reagendamentos em um fluxo único.'
  },
  {
    icon: MessageCircle,
    title: 'CRM de WhatsApp com IA',
    desc: 'Assistentes de IA para responder pacientes, qualificar pedidos e apoiar a recepção.'
  },
  {
    icon: FileText,
    title: 'Prontuário e financeiro',
    desc: 'Registro clínico e gestão financeira integrados ao contexto do atendimento.'
  }
];

const scheduleRows = [
  { time: '08:30', appointment: 'Consulta inicial', status: 'Confirmado' },
  { time: '10:00', appointment: 'Avaliação', status: 'Aguardando' },
  { time: '14:30', appointment: 'Retorno', status: 'Confirmado' }
];

const CompanyValidationSection: React.FC = () => {
  const sectionReveal = useScrollReveal();
  const productReveal = useScrollReveal(0.25);

  return (
    <section
      id="sobre-nexclinica"
      ref={sectionReveal.ref}
      className="relative py-20 bg-gradient-to-b from-white via-brand-50/30 to-white dark:from-black dark:via-brand-950/20 dark:to-black overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="absolute left-0 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[120px]" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium mb-6">
            <Sparkles className="w-3 h-3 inline mr-1" />
            Empresa de software
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 max-w-4xl mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.01em' }}
          >
            Sobre a Nexclinica
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            A Nexclinica desenvolve um software web para clínicas. O produto combina ERP clínico, CRM de WhatsApp e assistentes de IA para reduzir trabalho manual na recepção e organizar a operação em uma única plataforma.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {businessFacts.map((fact, i) => (
            <div
              key={fact.title}
              className={`p-6 rounded-2xl bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-sm transition-all duration-500 hover:border-brand-500/30 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-5">
                <fact.icon className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="text-slate-900 dark:text-white font-semibold text-lg mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {fact.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{fact.desc}</p>
            </div>
          ))}
        </div>

        <div
          ref={productReveal.ref}
          className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center mb-14"
        >
          <div className={`transition-all duration-700 ${productReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium mb-6">
              Produto
            </span>
            <h3
              className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.01em' }}
            >
              Uma plataforma online para operar a clínica e atender pacientes pelo WhatsApp
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              A Nexclinica conecta agenda, atendimento, prontuário e financeiro para que sua equipe trabalhe com mais contexto e menos retrabalho.
            </p>
            <div className="space-y-4">
              {productPillars.map((pillar, i) => (
                <div
                  key={pillar.title}
                  className={`flex gap-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5 transition-all duration-500 ${productReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                    <pillar.icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-semibold mb-1">{pillar.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-700 ${productReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '250ms' }}>
            <div className="rounded-[2rem] border border-black/10 dark:border-white/10 bg-slate-950 p-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div>
                  <p className="text-white font-semibold">Nexclinica</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  Demonstração
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-brand-300" />
                    <p className="text-white text-sm font-semibold">Agenda inteligente</p>
                  </div>
                  <div className="space-y-3">
                    {scheduleRows.map(row => (
                      <div key={row.time} className="flex items-center justify-between rounded-xl bg-white/[0.06] px-3 py-2">
                        <div>
                          <p className="text-white text-sm">{row.time}</p>
                          <p className="text-slate-400 text-xs">{row.appointment}</p>
                        </div>
                        <span className="text-[10px] px-2 py-1 rounded-full bg-brand-500/15 text-brand-300">
                          {row.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageCircle className="w-4 h-4 text-brand-300" />
                    <p className="text-white text-sm font-semibold">Atendimento com IA</p>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-2xl rounded-tl-sm bg-white/[0.08] p-3 text-xs text-slate-200">
                      Olá, preciso remarcar minha consulta.
                    </div>
                    <div className="rounded-2xl rounded-tr-sm bg-brand-500/20 p-3 text-xs text-brand-100">
                      Posso ajudar. Encontrei horários disponíveis amanhã às 9h ou 15h.
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-white/[0.06] p-3">
                      <Shield className="w-4 h-4 text-brand-300" />
                      <p className="text-xs text-slate-300">Encaminhamento para humano quando necessário</p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 rounded-2xl bg-white/[0.06] border border-white/10 p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-white/[0.05] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-4 h-4 text-brand-300" />
                        <p className="text-white text-sm font-semibold">Prontuário</p>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 rounded-full bg-white/20" />
                        <div className="h-2 rounded-full bg-white/15 w-4/5" />
                        <div className="h-2 rounded-full bg-white/10 w-2/3" />
                      </div>
                    </div>
                    <div className="rounded-xl bg-white/[0.05] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <DollarSign className="w-4 h-4 text-brand-300" />
                        <p className="text-white text-sm font-semibold">Financeiro</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-14 rounded-lg bg-brand-500/20" />
                        <div className="h-14 rounded-lg bg-white/10" />
                        <div className="h-14 rounded-lg bg-white/10" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`max-w-4xl mx-auto transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '500ms' }}>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-brand-500/10 to-transparent border border-brand-500/20 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-500/10 flex items-center justify-center mb-5">
              <Users className="w-7 h-7 text-brand-400" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Equipe por trás
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
              A Nexclinica conta com desenvolvedores com experiência internacional, especialistas em segurança da informação com passagem por grandes empresas globais e profissionais especializados em LGPD e proteção de dados. Essa combinação garante um produto robusto, seguro e em total conformidade com a legislação brasileira de privacidade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyValidationSection;
