import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, User, FileText, CreditCard, Search, Filter } from 'lucide-react';

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

const WhatsAppCRMSection: React.FC = () => {
  const sectionReveal = useScrollReveal();
  const phoneReveal = useScrollReveal(0.3);

  const conversations = [
    { name: 'Maria Silva', message: 'Obrigada! Confirmo presença amanhã', time: '10:32', unread: false, avatar: 'MS' },
    { name: 'João Santos', message: 'Preciso remarcar minha consulta...', time: '10:28', unread: true, avatar: 'JS' },
    { name: 'Ana Costa', message: 'Qual o valor da consulta?', time: '10:15', unread: true, avatar: 'AC' },
    { name: 'Pedro Lima', message: 'Recebi o lembrete, obrigado!', time: '09:45', unread: false, avatar: 'PL' },
  ];

  const patientDetails = {
    name: 'Maria Silva',
    phone: '(61) 99999-1234',
    lastVisit: '15/11/2024',
    nextVisit: '22/11/2024',
    totalVisits: 12,
    pendingPayment: false,
  };

  return (
    <section
      ref={sectionReveal.ref}
      className="relative min-h-screen bg-gradient-to-b from-black to-brand-950/30 py-24 overflow-hidden"
    >
      {/* Large Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className={`text-[20vw] font-black text-white/[0.03] select-none transition-all duration-1000 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
          style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.05em' }}
        >
          CONEXÃO
        </span>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium mb-6">
            CRM WhatsApp Nativo
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.01em' }}
          >
            Todas as conversas em um só lugar
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            CRM nativo no WhatsApp que mantém contexto, histórico completo e integração
            automática com prontuário e finanças.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">

          {/* Left: Dashboard Preview */}
          <div
            className={`lg:col-span-7 transition-all duration-1000 ${sectionReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-brand-400" />
                  <span className="text-white font-semibold">Central de Mensagens</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                    <Search className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500 text-xs">Buscar paciente...</span>
                  </div>
                  <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <Filter className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-12">
                {/* Conversations List */}
                <div className="md:col-span-5 border-r border-white/10">
                  <div className="p-2">
                    {conversations.map((conv, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                          i === 0 ? 'bg-brand-500/10 border border-brand-500/20' : 'hover:bg-white/5'
                        } ${sectionReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                        style={{ transitionDelay: `${400 + i * 100}ms` }}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
                          i === 0 ? 'bg-brand-500 text-white' : 'bg-white/10 text-slate-300'
                        }`}>
                          {conv.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-white text-sm font-medium">{conv.name}</span>
                            <span className="text-slate-500 text-[10px]">{conv.time}</span>
                          </div>
                          <p className="text-slate-400 text-xs truncate">{conv.message}</p>
                        </div>
                        {conv.unread && (
                          <div className="w-2 h-2 rounded-full bg-brand-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Patient Details Panel */}
                <div className="md:col-span-7 p-4">
                  <div className={`transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '600ms' }}>
                    {/* Patient Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold text-lg">
                        MS
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{patientDetails.name}</h3>
                        <p className="text-slate-400 text-sm">{patientDetails.phone}</p>
                      </div>
                    </div>

                    {/* Quick Info Cards */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <User className="w-4 h-4 text-brand-400 mb-2" />
                        <p className="text-slate-500 text-[10px]">Consultas</p>
                        <p className="text-white font-bold">{patientDetails.totalVisits}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <FileText className="w-4 h-4 text-brand-400 mb-2" />
                        <p className="text-slate-500 text-[10px]">Última visita</p>
                        <p className="text-white font-bold text-xs">{patientDetails.lastVisit}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <CreditCard className="w-4 h-4 text-brand-400 mb-2" />
                        <p className="text-slate-500 text-[10px]">Financeiro</p>
                        <p className="text-brand-400 font-bold text-xs">Em dia</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2.5 bg-brand-500 hover:bg-brand-400 text-black text-xs font-bold rounded-lg transition-all">
                        Ver Prontuário
                      </button>
                      <button className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold rounded-lg transition-all">
                        Novo Agendamento
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Central Unificada Card */}
          <div
            ref={phoneReveal.ref}
            className={`lg:col-span-5 flex items-center justify-center transition-all duration-1000 ${phoneReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            style={{ transitionDelay: '500ms' }}
          >
            {/* Central Visual */}
            <div className="relative w-full max-w-sm p-8 rounded-3xl bg-gradient-to-br from-brand-500/10 to-teal-500/10 border border-brand-500/20 backdrop-blur-xl">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-brand-500/20 flex items-center justify-center">
                  <MessageCircle className="w-10 h-10 text-brand-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Central Unificada</h3>
                <p className="text-slate-400 text-sm mb-6">
                  Histórico completo de cada paciente acessível em um clique
                </p>
                <div className="flex justify-center gap-8 text-center">
                  <div>
                    <p className="text-brand-400 text-2xl font-bold">100%</p>
                    <p className="text-slate-500 text-xs">Contexto mantido</p>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div>
                    <p className="text-brand-400 text-2xl font-bold">0</p>
                    <p className="text-slate-500 text-xs">Info perdida</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppCRMSection;
