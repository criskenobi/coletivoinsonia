import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Music, Users, Heart, Target, Edit } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const About = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [content, setContent] = useState({
    mission: 'O Coletivo Insônia nasceu da necessidade de criar um espaço autêntico para a música alternativa e a cultura underground. Somos um coletivo de artistas, músicos e amantes da boa música que acreditam no poder transformador da arte.',
    values: [
      'Autenticidade e expressão artística genuína',
      'Apoio mútuo entre artistas independentes',
      'Diversidade musical e cultural',
      'Acesso democrático à cultura',
    ],
  });

  useEffect(() => {
    const storedContent = localStorage.getItem('aboutContent');
    if (storedContent) {
      setContent(JSON.parse(storedContent));
    }
  }, []);

  const timeline = [
    {
      year: '2024',
      title: 'Fundação do Coletivo',
      description: 'Início das atividades com o primeiro show coletivo reunindo bandas locais.',
    },
    {
      year: '2025',
      title: 'Expansão e Reconhecimento',
      description: 'Realização de festivais mensais e parcerias com espaços culturais.',
    },
    {
      year: '2026',
      title: 'Novo Capítulo',
      description: 'Planejamento de eventos maiores e consolidação da cena alternativa local.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Sobre - Coletivo Insônia</title>
        <meta name="description" content="Conheça a história, missão e valores do Coletivo Insônia, um espaço dedicado à música alternativa e cultura underground." />
      </Helmet>

      <Navigation />

      <div className="min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-[#2a2a2a]">
        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1562765722-751e6f76ac82"
            alt="Coletivo Insônia em ação"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-6xl md:text-7xl font-bold text-[#D4A574] mb-4">
                Sobre Nós
              </h1>
              <p className="text-2xl text-white max-w-2xl">
                Somos música, somos resistência, somos Insônia
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Mission Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Target size={40} className="text-[#D4A574]" />
                <h2 className="text-4xl font-bold text-[#D4A574]">Nossa Missão</h2>
              </div>
              {isAuthenticated && (
                <Button
                  onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no próximo prompt! 🚀" })}
                  variant="outline"
                  className="border-[#4A7C59] text-[#4A7C59] hover:bg-[#4A7C59] hover:text-white"
                >
                  <Edit size={20} className="mr-2" />
                  Editar
                </Button>
              )}
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">{content.mission}</p>
          </motion.section>

          {/* Values Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center gap-4 mb-8">
              <Heart size={40} className="text-[#D4A574]" />
              <h2 className="text-4xl font-bold text-[#D4A574]">Nossos Valores</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {content.values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-lg border border-[#D4A574]/20 rounded-xl p-6 hover:border-[#D4A574]/40 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#4A7C59] rounded-full mt-2" />
                    <p className="text-lg text-gray-300">{value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Timeline Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center gap-4 mb-12">
              <Music size={40} className="text-[#D4A574]" />
              <h2 className="text-4xl font-bold text-[#D4A574]">Nossa História</h2>
            </div>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-8 border-l-2 border-[#D4A574]"
                >
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-[#D4A574] rounded-full border-4 border-black" />
                  <div className="bg-white/5 backdrop-blur-lg border border-[#D4A574]/20 rounded-xl p-6 hover:border-[#D4A574]/40 transition-all duration-300">
                    <span className="text-2xl font-bold text-[#4A7C59]">{item.year}</span>
                    <h3 className="text-xl font-bold text-[#D4A574] mt-2 mb-3">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Community Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-[#D4A574]/10 to-[#4A7C59]/10 border border-[#D4A574]/20 rounded-2xl p-12">
              <Users size={64} className="mx-auto text-[#D4A574] mb-6" />
              <h2 className="text-4xl font-bold text-[#D4A574] mb-6">Junte-se à Nossa Comunidade</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Seja parte de um movimento que valoriza a autenticidade, a criatividade e a paixão pela música. 
                O Coletivo Insônia está sempre aberto a novos talentos e colaborações.
              </p>
              <Button
                onClick={() => window.location.href = '/contato'}
                className="bg-gradient-to-r from-[#D4A574] to-[#4A7C59] hover:from-[#c89a68] hover:to-[#3d6a4b] text-white text-lg px-8 py-6"
              >
                Entre em Contato
              </Button>
            </div>
          </motion.section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;