import React, { useEffect, useRef, useState } from 'react';
import { Shield, Lock, Server, FileCheck, Eye, Database, CheckCircle2 } from 'lucide-react';

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

const TrustSection: React.FC = () => {
  const sectionReveal = useScrollReveal();

  const securityFeatures = [
    {
      icon: Lock,
      title: 'Criptografia de Ponta',
      desc: 'Dados protegidos com criptografia AES-256 em trânsito e em repouso.',
    },
    {
      icon: Server,
      title: 'Infraestrutura Segura',
      desc: 'Servidores em nuvem com certificação ISO 27001 e SOC 2.',
    },
    {
      icon: Eye,
      title: 'Acesso Controlado',
      desc: 'Controle granular de permissões e autenticação multi-fator.',
    },
    {
      icon: Database,
      title: 'Backup Automático',
      desc: 'Backups diários com retenção de 90 dias e recuperação garantida.',
    },
  ];

  const complianceItems = [
    'LGPD - Lei Geral de Proteção de Dados',
    'Resolução CFM nº 1.821/07',
    'Prontuário Eletrônico Certificado',
    'Auditoria de Acesso Completa',
    'Consentimento Digital do Paciente',
    'Direito ao Esquecimento',
  ];

  return (
    <section
      ref={sectionReveal.ref}
      className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white py-24 overflow-hidden"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-xs font-medium mb-6">
            Segurança & Conformidade
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.01em' }}
          >
            Segurança que você pode confiar
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Arquitetura LGPD-by-design com controle de acesso auditável e
            proteção de dados clínicos em conformidade com todas as regulamentações.
          </p>
        </div>

        {/* Security Features Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
          {securityFeatures.map((feature, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-brand-200 transition-all duration-300 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-slate-900 font-bold text-lg mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {feature.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* LGPD Compliance Section */}
        <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '500ms' }}>

          {/* Left: Compliance Badge */}
          <div className="relative">
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-brand-50 to-teal-50 border border-brand-100">
              {/* Large Shield Icon */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-200 rounded-full blur-2xl opacity-50" />
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center">
                    <Shield className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-black text-slate-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  LGPD Compliant
                </h3>
                <p className="text-slate-600 text-sm mb-6">
                  Totalmente em conformidade com a Lei Geral de Proteção de Dados
                </p>

                {/* Badge Row */}
                <div className="flex justify-center gap-4">
                  <div className="px-4 py-2 rounded-lg bg-white border border-slate-200 shadow-sm">
                    <FileCheck className="w-5 h-5 text-brand-600 mx-auto mb-1" />
                    <span className="text-slate-700 text-xs font-medium">Certificado</span>
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-white border border-slate-200 shadow-sm">
                    <Lock className="w-5 h-5 text-brand-600 mx-auto mb-1" />
                    <span className="text-slate-700 text-xs font-medium">Criptografado</span>
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-white border border-slate-200 shadow-sm">
                    <Eye className="w-5 h-5 text-brand-600 mx-auto mb-1" />
                    <span className="text-slate-700 text-xs font-medium">Auditável</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Compliance Checklist */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Conformidade Garantida
            </h3>
            <div className="space-y-4">
              {complianceItems.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 transition-all duration-300 hover:border-brand-200 hover:shadow-sm ${sectionReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                  style={{ transitionDelay: `${600 + i * 100}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0" />
                  <span className="text-slate-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Statement */}
        <div className={`mt-20 text-center transition-all duration-700 ${sectionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '800ms' }}>
          <p className="text-slate-500 text-sm mb-8">
            Arquitetura proprietária com pipelines de dados seguros
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {/* Placeholder for partner/certification logos */}
            <div className="h-8 w-24 bg-slate-300 rounded" />
            <div className="h-8 w-28 bg-slate-300 rounded" />
            <div className="h-8 w-20 bg-slate-300 rounded" />
            <div className="h-8 w-32 bg-slate-300 rounded" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
