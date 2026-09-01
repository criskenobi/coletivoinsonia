import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Music, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import BandCarousel from '@/components/BandCarousel';
import SponsorLogos from '@/components/SponsorLogos';
import Footer from '@/components/Footer';
const HomePage = () => {
  const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1562765722-751e6f76ac82');
  useEffect(() => {
    const storedImage = localStorage.getItem('heroBackgroundImage');
    if (storedImage) {
      setHeroImage(storedImage);
    }
  }, []);
  return <>
      <Helmet>
        <title>Coletivo Insônia - Música Alternativa e Cultura Underground</title>
        <meta name="description" content="Coletivo Insônia é um espaço dedicado à música alternativa e cultura underground. Descubra bandas, eventos e galeria de shows." />
      </Helmet>

      <Navigation />

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src={heroImage} alt="Banda ao vivo no palco com luzes vibrantes" className="w-full h-full object-cover" />
          {/* Lighter overlays as requested */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4A574]/10 via-transparent to-[#4A7C59]/10" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Bem-vindo ao
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A574] via-[#f0c584] to-[#4A7C59]">
              Coletivo Insônia
            </span>
          </motion.h1>

          <motion.p initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Espaço onde a música independente ganha vida. Explore bandas, eventos e a energia da cena underground do DF.
          </motion.p>

          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.6
        }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={() => window.location.href = '/bandas'} className="bg-gradient-to-r from-[#D4A574] to-[#4A7C59] hover:from-[#c89a68] hover:to-[#3d6a4b] text-white text-lg px-8 py-6 rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto">
              <Music className="mr-2" size={24} />
              Explorar Bandas
              <ChevronRight className="ml-2" size={24} />
            </Button>

            <Button onClick={() => window.location.href = '/eventos'} variant="outline" className="border-2 border-[#D4A574] text-[#D4A574] hover:bg-[#D4A574] hover:text-black text-lg px-8 py-6 rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto backdrop-blur-sm bg-black/20">
              <Calendar className="mr-2" size={24} />
              Ver Eventos
              <ChevronRight className="ml-2" size={24} />
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 1,
        delay: 1
      }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{
          y: [0, 10, 0]
        }} transition={{
          duration: 2,
          repeat: Infinity
        }} className="w-6 h-10 border-2 border-[#D4A574] rounded-full flex items-start justify-center p-2 backdrop-blur-sm">
            <motion.div animate={{
            opacity: [0, 1, 0]
          }} transition={{
            duration: 2,
            repeat: Infinity
          }} className="w-1.5 h-1.5 bg-[#D4A574] rounded-full" />
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-black to-[#1a1a1a] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#D4A574] mb-4">
              O Que Fazemos
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Promovemos a música independente através de shows, festivais e apoio aos artistas locais
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {[{
            icon: Music,
            title: 'Bandas Independentes',
            description: 'Apoiamos e divulgamos o trabalho de artistas da cena alternativa'
          }, {
            icon: Calendar,
            title: 'Eventos Únicos',
            description: 'Organizamos shows e festivais que celebram a diversidade musical'
          }, {
            icon: Music,
            title: 'Comunidade Ativa',
            description: 'Conectamos músicos, fãs e todos que amam música de verdade'
          }].map((feature, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} viewport={{
            once: true
          }} className="bg-white/5 backdrop-blur-lg border border-[#D4A574]/20 rounded-xl p-8 hover:border-[#D4A574]/40 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <feature.icon size={48} className="text-[#D4A574] mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>)}
          </div>

          {/* Band Carousel */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Destaques da Cena
            </h2>
            <BandCarousel />
          </motion.div>

        </div>
      </div>

      {/* Sponsors Section */}
      <SponsorLogos />

      <Footer />
    </>;
};
export default HomePage;