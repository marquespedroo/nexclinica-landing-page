import React, { useEffect, useRef, useState } from 'react';
import { Bot, Calendar, Bell, RotateCcw, MessageSquare, Clock } from 'lucide-react';

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

const AIAgentsSection: React.FC = () => {
  const sectionReveal = useScrollReveal();
  const chatReveal = useScrollReveal(0.3);
  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    if (sectionReveal.isVisible) {
      const timer = setTimeout(() => setScanComplete(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [sectionReveal.isVisible]);

  const chatMessages = [
    { type: 'bot', text: 'Olá! Sou a assistente virtual da Clínica Vida. Como posso ajudar?' },
    { type: 'user', text: 'Quero agendar uma consulta com o Dr. Carlos' },
    { type: 'bot', text: 'Claro! Dr. Carlos tem horários disponíveis amanhã às 14h ou quinta às 10h. Qual prefere?' },
    { type: 'user', text: 'Quinta às 10h' },
    { type: 'bot', text: 'Perfeito! ✓ Consulta agendada para quinta-feira às 10h com Dr. Carlos. Enviarei um lembrete 24h antes.' },
  ];

  return (
    <section
      ref={sectionReveal.ref}
      className="relative min-h-screen bg-gradient-to-b from-black via-brand-950/20 to-black py-24 overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium mb-6">
            Agentes de IA
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.01em' }}
          >
            Seus assistentes de IA trabalham enquanto você dorme
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            IA conversacional que agenda, confirma, lembra e remarca consultas automaticamente.
            Atendimento 24/7 pelo WhatsApp.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Scanning Animation / Schedule Transform */}
          <div
            className={`relative transition-all duration-1000 ${sectionReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
            style={{ transitionDelay: '300ms' }}
          >
            {/* Schedule Card */}
            <div className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 overflow-hidden">
              {/* Scanning Line */}
              {sectionReveal.isVisible && !scanComplete && (
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <div
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-400 to-transparent animate-scan"
                    style={{
                      animation: 'scan 2s ease-in-out forwards',
                      boxShadow: '0 0 20px rgba(52, 211, 153, 0.8), 0 0 40px rgba(52, 211, 153, 0.4)'
                    }}
                  />
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold">Agenda - Segunda-feira</h3>
                <span className={`text-xs px-2 py-1 rounded-full transition-all duration-500 ${scanComplete ? 'bg-brand-500/20 text-brand-400' : 'bg-red-500/20 text-red-400'}`}>
                  {scanComplete ? '✓ Otimizada' : '3 conflitos'}
                </span>
              </div>

              {/* Schedule Items */}
              <div className="space-y-3">
                {[
                  { time: '08:00', patient: 'Maria Silva', status: scanComplete ? 'confirmed' : 'pending', type: 'Retorno' },
                  { time: '09:00', patient: 'João Santos', status: scanComplete ? 'confirmed' : 'conflict', type: 'Consulta' },
                  { time: '10:00', patient: '—', status: scanComplete ? 'filled' : 'empty', type: scanComplete ? 'Ana Costa (remarcado)' : 'Horário vago' },
                  { time: '11:00', patient: 'Pedro Lima', status: scanComplete ? 'confirmed' : 'pending', type: 'Exame' },
                  { time: '14:00', patient: 'Carla Dias', status: scanComplete ? 'confirmed' : 'conflict', type: 'Consulta' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-500 ${
                      item.status === 'confirmed' ? 'bg-brand-500/10 border border-brand-500/20' :
                      item.status === 'conflict' ? 'bg-red-500/10 border border-red-500/20' :
                      item.status === 'filled' ? 'bg-brand-500/10 border border-brand-500/20' :
                      item.status === 'empty' ? 'bg-yellow-500/10 border border-yellow-500/20' :
                      'bg-white/5 border border-white/10'
                    }`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <span className="text-slate-400 text-sm font-mono w-12">{item.time}</span>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{item.patient}</p>
                      <p className="text-slate-500 text-xs">{item.type}</p>
                    </div>
                    {item.status === 'confirmed' && <div className="w-2 h-2 rounded-full bg-brand-400" />}
                    {item.status === 'conflict' && <div className="w-2 h-2 rounded-full bg-red-400" />}
                    {item.status === 'empty' && <div className="w-2 h-2 rounded-full bg-yellow-400" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Stats */}
            <div className={`absolute -bottom-4 -right-4 px-4 py-3 rounded-xl bg-brand-500/20 border border-brand-500/30 backdrop-blur-xl transition-all duration-700 ${scanComplete ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <p className="text-brand-400 text-xs font-medium">Taxa de ocupação</p>
              <p className="text-white text-2xl font-bold">94%</p>
            </div>
          </div>

          {/* Right: Chat Interface with Glassmorphism */}
          <div
            ref={chatReveal.ref}
            className={`relative transition-all duration-1000 ${chatReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            style={{ transitionDelay: '500ms' }}
          >
            {/* Phone Frame */}
            <div className="relative mx-auto max-w-sm">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-brand-500/20 rounded-[3rem] blur-3xl" />

              {/* Phone Body */}
              <div className="relative rounded-[2.5rem] bg-gradient-to-b from-slate-800 to-slate-900 p-2 border border-white/10">
                {/* Screen */}
                <div className="rounded-[2rem] bg-black overflow-hidden">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between px-6 py-2 bg-brand-600">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white text-xs font-medium">Clínica Vida</p>
                        <p className="text-brand-200 text-[10px]">Online agora</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-3 min-h-[320px] bg-gradient-to-b from-slate-900/50 to-slate-900">
                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} transition-all duration-500 ${chatReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                        style={{ transitionDelay: `${800 + i * 200}ms` }}
                      >
                        <div
                          className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs ${
                            msg.type === 'user'
                              ? 'bg-brand-500 text-white rounded-br-sm'
                              : 'bg-white/10 text-slate-200 rounded-bl-sm backdrop-blur-sm'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input Bar */}
                  <div className="p-3 bg-slate-900/80 border-t border-white/5">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10">
                      <span className="text-slate-500 text-xs flex-1">Digite uma mensagem...</span>
                      <div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center">
                        <MessageSquare className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '800ms' }}>
          {[
            { icon: Calendar, title: 'Agendamento', desc: 'Automático 24/7' },
            { icon: Bell, title: 'Lembretes', desc: 'SMS e WhatsApp' },
            { icon: RotateCcw, title: 'Remarcações', desc: 'Sem intervenção' },
            { icon: Clock, title: 'Confirmações', desc: 'Reduz no-show' },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-brand-500/30 transition-all group"
            >
              <feature.icon className="w-8 h-8 text-brand-400 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="text-white font-semibold text-sm mb-1">{feature.title}</h4>
              <p className="text-slate-500 text-xs">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for scan animation */}
      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2s ease-in-out forwards;
        }
      `}</style>
    </section>
  );
};

export default AIAgentsSection;
