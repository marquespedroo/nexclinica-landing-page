import React, { useEffect, useRef, useState } from 'react';
import { Bot, Calendar, Bell, RotateCcw, Zap, Clock, Check, MessageSquare } from 'lucide-react';

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

const AIConversationalSection: React.FC = () => {
  const sectionReveal = useScrollReveal();
  const chatReveal = useScrollReveal(0.3);

  const capabilities = [
    { icon: Calendar, text: 'Agenda consultas direto no sistema, sem intervenção humana' },
    { icon: Bell, text: 'Confirma e lembra os pacientes automaticamente' },
    { icon: RotateCcw, text: 'Remarca horários quando necessário' },
    { icon: Zap, text: 'Responde em menos de 5 segundos, a qualquer hora do dia ou da noite' },
    { icon: Bot, text: 'Entende o contexto da conversa — como um atendente de verdade faria' }
  ];

  const chatMessages = [
    { type: 'user', text: 'Oi, preciso remarcar minha consulta de amanhã' },
    { type: 'bot', text: 'Olá! Claro, posso ajudar. Vi que você tem consulta amanhã às 14h com Dra. Ana. Qual novo horário prefere?' },
    { type: 'user', text: 'Tem quinta às 10h?' },
    { type: 'bot', text: 'Quinta às 10h está disponível! ✓ Remarcado com sucesso. Enviarei um lembrete na véspera.' },
  ];

  return (
    <section
      id="ia-conversacional"
      ref={sectionReveal.ref}
      className="relative min-h-screen bg-gradient-to-b from-white via-brand-50/30 to-white dark:from-black dark:via-brand-950/20 dark:to-black py-24 overflow-hidden"
    >
      {/* Background Grid */}
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
            <Bot className="w-3 h-3 inline mr-1" />
            IA Conversacional
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.01em' }}
          >
            Uma assistente de IA que realmente entende sua clínica
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Esqueça chatbots que só respondem "aguarde um momento". A nexclinica tem uma IA conversacional nativa no WhatsApp que:
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Capabilities List */}
          <div
            className={`transition-all duration-1000 ${sectionReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="space-y-4">
              {capabilities.map((cap, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-brand-500/30 transition-all duration-500 ${sectionReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}
                  style={{ transitionDelay: `${400 + i * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                    <cap.icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-400 flex-shrink-0" />
                    <p className="text-slate-700 dark:text-slate-300 text-sm">{cap.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 24/7 Badge */}
            <div
              className={`mt-8 p-6 rounded-2xl bg-gradient-to-br from-brand-500/10 to-transparent border border-brand-500/20 transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: '900ms' }}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-brand-500/20 flex items-center justify-center">
                  <Clock className="w-7 h-7 text-brand-400" />
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white font-semibold text-lg">Funciona 24 horas por dia, 7 dias por semana</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    Seu paciente agenda às 23h de um domingo? A IA resolve. Precisa remarcar às 6h da manhã? Feito.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Chat Interface */}
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
              <div className="relative rounded-[2.5rem] bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-2 border border-slate-300 dark:border-white/10 shadow-2xl">
                {/* Screen */}
                <div className="rounded-[2rem] bg-white dark:bg-black overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between px-6 py-2 bg-brand-600">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white text-xs font-medium">nexclinica IA</p>
                        <p className="text-brand-200 text-[10px]">Respondendo agora</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-3 min-h-[280px] bg-[#e5ddd5] dark:bg-slate-900 lg:bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] dark:lg:bg-none bg-repeat">
                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} transition-all duration-500 ${chatReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                        style={{ transitionDelay: `${800 + i * 200}ms` }}
                      >
                        <div
                          className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs ${msg.type === 'user'
                            ? 'bg-brand-500 text-white rounded-br-sm'
                            : 'bg-white text-slate-800 dark:bg-white/10 dark:text-slate-200 rounded-bl-sm shadow-sm'
                            }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input Bar */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-white/5">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
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

        {/* Result Badge */}
        <div
          className={`mt-16 text-center transition-all duration-700 ${chatReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          style={{ transitionDelay: '1200ms' }}
        >
          <div className="inline-block p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
            <p className="text-xl font-semibold text-slate-900 dark:text-white">
              Resultado: <span className="text-brand-400">menos faltas</span>, <span className="text-brand-400">agenda mais cheia</span>, <span className="text-brand-400">equipe focada no atendimento presencial</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIConversationalSection;
