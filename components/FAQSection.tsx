import React, { useEffect, useRef, useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, Monitor, RefreshCw, Shield, DollarSign, Rocket, Wrench, Plus } from 'lucide-react';

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

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  icon: React.ElementType;
  title: string;
  items: FAQItem[];
}

const FAQSection: React.FC = () => {
  const sectionReveal = useScrollReveal();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const faqCategories: FAQCategory[] = [
    {
      icon: MessageCircle,
      title: 'Sobre o WhatsApp e a IA',
      items: [
        {
          question: 'O que exatamente essa IA faz no meu WhatsApp?',
          answer: 'A IA da Nexclinica funciona como uma recepcionista virtual que trabalha 24 horas. Quando um paciente manda mensagem para o WhatsApp da sua clínica, a IA: Responde automaticamente (em menos de 5 segundos), entende o que o paciente quer (agendar, remarcar, tirar dúvida sobre horário), consulta a agenda real da clínica e oferece horários disponíveis, agenda a consulta direto no sistema sem precisar de ninguém, envia lembretes antes da consulta, e pede confirmação — se o paciente não puder ir, já oferece outro horário. Tudo isso acontece automaticamente, mesmo de madrugada ou no fim de semana.'
        },
        {
          question: 'Preciso trocar o número do WhatsApp da minha clínica?',
          answer: 'Não necessariamente. Podemos configurar a IA no número que você já usa. O importante é que seja um WhatsApp Business (aquele com o ícone verde com um "B"). Se você ainda usa o WhatsApp comum, ajudamos você a migrar — é simples e você mantém o mesmo número.'
        },
        {
          question: 'E se a IA não souber responder algo?',
          answer: 'A IA foi treinada para resolver as situações mais comuns do dia a dia de uma clínica. Mas ela sabe reconhecer quando não consegue ajudar. Nesses casos, ela avisa educadamente o paciente e direciona para atendimento humano — pode ser para a recepção responder quando estiver disponível, ou transferir para outro canal. Você também pode definir quais assuntos a IA deve resolver sozinha e quais deve encaminhar para sua equipe.'
        },
        {
          question: 'A IA vai parecer um robô? O paciente vai perceber que não é uma pessoa?',
          answer: 'A IA conversa de forma natural, como uma pessoa educada e profissional faria. Ela entende variações de linguagem, erros de digitação e diferentes formas de pedir a mesma coisa. Dito isso, recomendamos transparência: muitas clínicas apresentam a IA com um nome (ex: "Olá! Sou a Ana, assistente virtual da Clínica São Lucas"). Os pacientes geralmente gostam — o importante para eles é ser bem atendidos rapidamente.'
        },
        {
          question: 'E se o paciente quiser falar com uma pessoa de verdade?',
          answer: 'Sem problema. A qualquer momento o paciente pode pedir para falar com um humano, e a IA encaminha a conversa. Sua equipe recebe a notificação e assume o atendimento. O histórico da conversa fica salvo, então a recepcionista já sabe o que foi tratado.'
        }
      ]
    },
    {
      icon: Monitor,
      title: 'Sobre o Sistema (ERP)',
      items: [
        {
          question: 'O que é esse tal de "ERP"?',
          answer: 'ERP é só um nome técnico para "sistema de gestão". No caso da Nexclinica, é um programa onde você controla tudo da sua clínica em um lugar só: Agenda (marca, remarca, visualiza horários de todos os profissionais), Prontuário (histórico do paciente, anotações das consultas, documentos) e Financeiro (controle de pagamentos, cobranças, relatórios de faturamento). Em vez de ter um programa para cada coisa (ou pior, planilhas e papéis), você tem tudo integrado.'
        },
        {
          question: 'Vou precisar instalar algum programa no computador?',
          answer: 'Não. A Nexclinica funciona 100% no navegador de internet (Chrome, Firefox, Edge...). Você acessa pelo site, faz login, e pronto. Funciona em qualquer computador, tablet ou até celular. Não precisa instalar nada, não precisa de técnico de informática, não ocupa espaço no seu computador.'
        },
        {
          question: 'Preciso de internet boa para usar?',
          answer: 'Precisa de internet, sim — como qualquer sistema online hoje em dia. Mas não precisa ser uma internet super rápida. Se você consegue assistir vídeos no YouTube ou usar redes sociais sem travar, consegue usar a Nexclinica tranquilamente.'
        },
        {
          question: 'Quantas pessoas podem usar ao mesmo tempo?',
          answer: 'Não tem limite. Cada pessoa da sua equipe terá seu próprio login. A recepcionista acessa a agenda, o médico acessa o prontuário do paciente dele, o financeiro vê os relatórios — cada um vê o que precisa, tudo ao mesmo tempo, sem conflito.'
        }
      ]
    },
    {
      icon: RefreshCw,
      title: 'Sobre Integração com Outros Sistemas',
      items: [
        {
          question: 'Já uso outro sistema na minha clínica. Preciso jogar tudo fora?',
          answer: 'Depende do sistema. A Nexclinica foi pensada para ser completa — agenda, prontuário e financeiro integrados. O ideal é usar ela como sistema principal. Mas entendemos que migrar de sistema dá trabalho. Por isso: se você usa o Feegow, sim, conseguimos integrar. A IA pode consultar e agendar direto no Feegow, e você continua usando o sistema que já conhece. Outros sistemas: avaliamos caso a caso. Alguns têm integração possível, outros não. Fale com nossa equipe para verificarmos juntos.'
        },
        {
          question: 'Como funciona a integração com o Feegow?',
          answer: 'Se você já usa o Feegow e está satisfeito, pode manter. Nesse caso, a Nexclinica entra como uma "camada de atendimento inteligente": a IA conversa com o paciente pelo WhatsApp e agenda direto no Feegow. Você ganha o atendimento automático 24h sem precisar trocar o sistema de gestão que já conhece.'
        },
        {
          question: 'E se eu quiser migrar do meu sistema atual para a Nexclinica?',
          answer: 'Ajudamos você nessa transição. Podemos importar sua base de pacientes e histórico de agendamentos para você não começar do zero. O processo varia conforme o sistema atual, mas nossa equipe acompanha tudo.'
        }
      ]
    },
    {
      icon: Shield,
      title: 'Sobre Segurança e LGPD',
      items: [
        {
          question: 'Meus dados e dos pacientes estão seguros?',
          answer: 'Sim. Levamos segurança muito a sério, especialmente por lidar com dados de saúde. Algumas medidas que tomamos: todos os dados são criptografados (embaralhados de um jeito que só o sistema consegue ler), os servidores ficam em data centers seguros com backup automático, cada usuário só acessa o que tem permissão para ver, e registramos quem acessou o quê e quando (isso se chama "auditoria").'
        },
        {
          question: 'A Nexclinica está adequada à LGPD?',
          answer: 'Sim. O sistema foi construído desde o início pensando na LGPD (a lei de proteção de dados). Isso significa: pedimos só os dados necessários, os dados ficam protegidos e não são compartilhados com terceiros, você consegue atender pedidos de pacientes que queiram saber quais dados têm cadastrados, e temos termos de uso e política de privacidade claros. Se um paciente pedir para apagar os dados dele, você consegue fazer isso pelo sistema.'
        },
        {
          question: 'Quem pode ver as conversas do WhatsApp?',
          answer: 'As conversas ficam registradas no sistema para histórico e qualidade do atendimento. Apenas pessoas autorizadas da sua clínica (que você define) podem visualizar. Nós, da Nexclinica, não ficamos lendo conversas dos seus pacientes.'
        }
      ]
    },
    {
      icon: DollarSign,
      title: 'Sobre Preços e Custos',
      items: [
        {
          question: 'Quanto custa a Nexclinica?',
          answer: 'Trabalhamos com planos mensais que variam conforme o tamanho da clínica (quantidade de profissionais, volume de atendimentos). Entre em contato para receber um orçamento personalizado — não temos pegadinha nem preço escondido. O que podemos adiantar: nosso modelo foi pensado para ser acessível a clínicas pequenas e médias, não só para grandes redes.'
        },
        {
          question: 'Tem taxa de instalação ou fidelidade?',
          answer: 'Cobramos uma taxa única de implantação, que cobre a configuração do sistema, treinamento da equipe e migração de dados. Não temos fidelidade: você fica porque quer, não porque está preso em contrato.'
        },
        {
          question: 'Vou economizar dinheiro usando a Nexclinica?',
          answer: 'A economia vem de vários lados: menos faltas (lembretes automáticos reduzem o "não comparecimento", que é dinheiro perdido), mais agendamentos (a IA captura pacientes que mandam mensagem fora do horário comercial), menos retrabalho (equipe para de perder tempo confirmando consulta por telefone), e mais eficiência (com tudo integrado, menos erros e menos tempo gasto procurando informação). Muitas clínicas conseguem pagar o sistema só com a redução de faltas.'
        },
        {
          question: 'Posso testar antes de contratar?',
          answer: 'Sim. Oferecemos uma demonstração onde mostramos o sistema funcionando e simulamos o atendimento da IA. Assim você vê na prática como seria na sua clínica antes de decidir.'
        }
      ]
    },
    {
      icon: Rocket,
      title: 'Sobre Implementação',
      items: [
        {
          question: 'Quanto tempo leva para começar a usar?',
          answer: 'Em média, de 1 a 2 semanas. O tempo varia conforme: se você vai migrar de outro sistema ou começar do zero, quantos profissionais e serviços sua clínica tem, e quão rápido sua equipe consegue participar do treinamento. Mas não se preocupe: acompanhamos tudo de perto. Você não fica sozinho tentando configurar.'
        },
        {
          question: 'Preciso de alguém de TI na minha clínica para implementar?',
          answer: 'Não. Nossa equipe faz toda a configuração técnica. O que precisamos é de alguém da sua clínica (pode ser você, o gerente, a recepcionista) para nos passar as informações: quais médicos atendem, quais horários, quais serviços, etc. O treinamento para usar o sistema é simples — se sua equipe sabe usar redes sociais, vai aprender rápido.'
        },
        {
          question: 'Vocês dão treinamento?',
          answer: 'Sim, o treinamento está incluído na implantação. Fazemos sessões online (por videochamada) com sua equipe, mostrando como usar cada parte do sistema. Também temos materiais de apoio (vídeos, guias) para consultar depois. Se entrar alguém novo na equipe, é só nos avisar que ajudamos a treinar.'
        }
      ]
    },
    {
      icon: Wrench,
      title: 'Sobre Suporte',
      items: [
        {
          question: 'E se eu tiver problema ou dúvida depois?',
          answer: 'Temos suporte por chat e WhatsApp em horário comercial. Para questões urgentes (sistema fora do ar, por exemplo), temos canais prioritários. Nosso objetivo é você não precisar de suporte — o sistema deve funcionar sem dor de cabeça. Mas quando precisar, estaremos lá.'
        },
        {
          question: 'Vocês atualizam o sistema? Vou ter que pagar a mais?',
          answer: 'Sim, melhoramos o sistema constantemente — novas funcionalidades, melhorias de desempenho, correções. Todas as atualizações estão incluídas no seu plano, sem custo extra. E como é tudo online, você nem percebe: da próxima vez que acessar, já está atualizado.'
        }
      ]
    },
    {
      icon: Plus,
      title: 'Outras Dúvidas',
      items: [
        {
          question: 'Funciona para qualquer especialidade médica?',
          answer: 'Sim. A Nexclinica atende clínicas de diversas especialidades: clínica geral, pediatria, dermatologia, ortopedia, fisioterapia, psicologia, odontologia, e muitas outras. A IA pode ser personalizada para entender os termos e fluxos da sua especialidade — por exemplo, saber que fisioterapia trabalha com sessões, ou que algumas consultas precisam de preparo específico.'
        },
        {
          question: 'Posso usar só a IA do WhatsApp, sem o sistema de gestão?',
          answer: 'Podemos estudar esse modelo, especialmente para clínicas que já estão satisfeitas com seu sistema atual (como o Feegow). A IA funcionaria integrada ao seu sistema existente. Fale com nossa equipe para avaliarmos se é possível no seu caso.'
        },
        {
          question: 'Não entendo muito de tecnologia. Vou conseguir usar?',
          answer: 'Se você usa WhatsApp, Facebook ou faz compras online, vai conseguir usar a Nexclinica. O sistema foi desenhado para ser simples. E nossa equipe está sempre disponível para ajudar nas primeiras semanas, até você pegar o jeito. Não precisa entender de tecnologia. Precisa só querer melhorar a gestão da sua clínica — o resto a gente resolve junto.'
        }
      ]
    }
  ];

  return (
    <section
      id="faq"
      ref={sectionReveal.ref}
      className="relative py-24 bg-gradient-to-b from-white via-brand-50/10 to-white dark:from-black dark:via-brand-950/10 dark:to-black overflow-hidden"
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
            <HelpCircle className="w-3 h-3 inline mr-1" />
            FAQ
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.01em' }}
          >
            Perguntas Frequentes
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Respostas claras para suas dúvidas, sem complicação.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto space-y-8">
          {faqCategories.map((category, catIndex) => (
            <div
              key={catIndex}
              className={`transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${catIndex * 100}ms` }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="text-slate-900 dark:text-white font-semibold text-lg" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {category.title}
                </h3>
              </div>

              {/* FAQ Items */}
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => {
                  const key = `${catIndex}-${itemIndex}`;
                  const isOpen = openItems[key];

                  return (
                    <div
                      key={itemIndex}
                      className="rounded-xl bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 overflow-hidden hover:border-brand-500/30 transition-all"
                    >
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full p-4 md:p-5 flex items-center justify-between text-left"
                      >
                        <span className="text-slate-900 dark:text-white text-sm md:text-base font-medium pr-4">{item.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-brand-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                            }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                          }`}
                      >
                        <div className="px-4 md:px-5 pb-4 md:pb-5">
                          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-16 transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-brand-500/5 to-transparent border border-brand-500/20 max-w-2xl mx-auto">
            <p className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Ainda tem dúvidas?
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
              Fale com a gente! Estamos prontos para responder qualquer pergunta, sem compromisso.
            </p>
            <a
              href="https://wa.me/556191039745?text=Olá! Gostaria de saber mais sobre a Nexclinica."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-brand-600 dark:bg-brand-500 hover:bg-brand-500 dark:hover:bg-brand-400 text-white dark:text-black font-bold rounded-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
            >
              Falar com Vendas
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
