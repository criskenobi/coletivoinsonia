import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Send, Music, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Contact = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('contact');

  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [bandForm, setBandForm] = useState({ 
    bandName: '', 
    genre: '', 
    members: '', 
    instagram: '', 
    spotify: '', 
    youtube: '', 
    description: '' 
  });
  const [eventForm, setEventForm] = useState({ 
    eventName: '', 
    date: '', 
    description: '', 
    bands: '' 
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push({ ...contactForm, type: 'contact', date: new Date().toISOString() });
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
    
    toast({
      title: "Mensagem enviada com sucesso!",
      description: "Entraremos em contato em breve.",
    });
    setContactForm({ name: '', email: '', message: '' });
  };

  const handleBandSubmit = (e) => {
    e.preventDefault();
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push({ ...bandForm, type: 'band', date: new Date().toISOString() });
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
    
    toast({
      title: "Cadastro enviado com sucesso!",
      description: "Analisaremos sua banda e retornaremos em breve.",
    });
    setBandForm({ bandName: '', genre: '', members: '', instagram: '', spotify: '', youtube: '', description: '' });
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push({ ...eventForm, type: 'event', date: new Date().toISOString() });
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
    
    toast({
      title: "Sugestão enviada com sucesso!",
      description: "Avaliaremos sua proposta de evento.",
    });
    setEventForm({ eventName: '', date: '', description: '', bands: '' });
  };

  return (
    <>
      <Helmet>
        <title>Contato - Coletivo Insônia</title>
        <meta name="description" content="Entre em contato com o Coletivo Insônia, cadastre sua banda ou sugira um evento. Estamos sempre abertos a novas parcerias." />
      </Helmet>

      <Navigation />

      <div className="min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-[#2a2a2a] pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#D4A574] mb-4">
              Fale Conosco
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Estamos prontos para ouvir você
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveTab('contact')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'contact'
                    ? 'bg-gradient-to-r from-[#D4A574] to-[#4A7C59] text-white'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-[#D4A574]/20'
                }`}
              >
                <Mail className="inline mr-2" size={20} />
                Contato Geral
              </button>
              <button
                onClick={() => setActiveTab('band')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'band'
                    ? 'bg-gradient-to-r from-[#D4A574] to-[#4A7C59] text-white'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-[#D4A574]/20'
                }`}
              >
                <Music className="inline mr-2" size={20} />
                Cadastrar Banda
              </button>
              <button
                onClick={() => setActiveTab('event')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'event'
                    ? 'bg-gradient-to-r from-[#D4A574] to-[#4A7C59] text-white'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-[#D4A574]/20'
                }`}
              >
                <Calendar className="inline mr-2" size={20} />
                Sugerir Evento
              </button>
            </div>
          </motion.div>

          {/* Forms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-lg border border-[#D4A574]/20 rounded-2xl p-8"
          >
            {/* Contact Form */}
            {activeTab === 'contact' && (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all resize-none"
                    placeholder="Sua mensagem..."
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#D4A574] to-[#4A7C59] hover:from-[#c89a68] hover:to-[#3d6a4b] text-white py-6 text-lg"
                >
                  <Send className="mr-2" size={20} />
                  Enviar Mensagem
                </Button>
              </form>
            )}

            {/* Band Registration Form */}
            {activeTab === 'band' && (
              <form onSubmit={handleBandSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nome da Banda
                    </label>
                    <input
                      type="text"
                      value={bandForm.bandName}
                      onChange={(e) => setBandForm({ ...bandForm, bandName: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
                      placeholder="Nome da banda"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Gênero Musical
                    </label>
                    <input
                      type="text"
                      value={bandForm.genre}
                      onChange={(e) => setBandForm({ ...bandForm, genre: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
                      placeholder="Rock, Indie, etc."
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Membros
                  </label>
                  <input
                    type="text"
                    value={bandForm.members}
                    onChange={(e) => setBandForm({ ...bandForm, members: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
                    placeholder="Nome dos membros"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Instagram
                    </label>
                    <input
                      type="url"
                      value={bandForm.instagram}
                      onChange={(e) => setBandForm({ ...bandForm, instagram: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
                      placeholder="Link do Instagram"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Spotify
                    </label>
                    <input
                      type="url"
                      value={bandForm.spotify}
                      onChange={(e) => setBandForm({ ...bandForm, spotify: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
                      placeholder="Link do Spotify"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      YouTube
                    </label>
                    <input
                      type="url"
                      value={bandForm.youtube}
                      onChange={(e) => setBandForm({ ...bandForm, youtube: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
                      placeholder="Link do YouTube"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={bandForm.description}
                    onChange={(e) => setBandForm({ ...bandForm, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all resize-none"
                    placeholder="Conte sobre a banda, influências, etc."
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#D4A574] to-[#4A7C59] hover:from-[#c89a68] hover:to-[#3d6a4b] text-white py-6 text-lg"
                >
                  <Music className="mr-2" size={20} />
                  Cadastrar Banda
                </Button>
              </form>
            )}

            {/* Event Suggestion Form */}
            {activeTab === 'event' && (
              <form onSubmit={handleEventSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nome do Evento
                  </label>
                  <input
                    type="text"
                    value={eventForm.eventName}
                    onChange={(e) => setEventForm({ ...eventForm, eventName: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
                    placeholder="Nome do evento"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Data Sugerida
                  </label>
                  <input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bandas Participantes
                  </label>
                  <input
                    type="text"
                    value={eventForm.bands}
                    onChange={(e) => setEventForm({ ...eventForm, bands: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
                    placeholder="Bandas que você gostaria de ver"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descrição do Evento
                  </label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all resize-none"
                    placeholder="Descreva sua ideia de evento..."
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#D4A574] to-[#4A7C59] hover:from-[#c89a68] hover:to-[#3d6a4b] text-white py-6 text-lg"
                >
                  <Calendar className="mr-2" size={20} />
                  Enviar Sugestão
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;