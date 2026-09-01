import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Plus, Edit, Trash2, Ticket } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const initialEvents = [
  {
    id: 1,
    title: 'Festival Insônia 2026',
    date: '2026-03-15',
    time: '20:00',
    location: 'Espaço Cultural Underground',
    bands: ['Banda Noturna', 'Eclipse Sonoro', 'Reverberação'],
    description: 'Grande festival reunindo as principais bandas do coletivo em uma noite memorável.',
    image: 'https://images.unsplash.com/photo-1562765722-751e6f76ac82',
    ticketLink: '#',
  },
  {
    id: 2,
    title: 'Noite Acústica',
    date: '2026-03-22',
    time: '19:30',
    location: 'Café Cultural',
    bands: ['Onda Magnética'],
    description: 'Apresentação intimista com versões acústicas de clássicos e músicas inéditas.',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4',
    ticketLink: '#',
  },
  {
    id: 3,
    title: 'Rock na Praça',
    date: '2026-04-05',
    time: '18:00',
    location: 'Praça Central',
    bands: ['Banda Noturna', 'Reverberação'],
    description: 'Show gratuito ao ar livre celebrando a música independente.',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
    ticketLink: '#',
  },
];

const EventsCalendar = () => {
  const [events, setEvents] = useState([]);
  const [filterDate, setFilterDate] = useState('all');
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      setEvents(initialEvents);
      localStorage.setItem('events', JSON.stringify(initialEvents));
    }
  }, []);

  const filteredEvents = filterDate === 'all'
    ? events
    : events.filter(event => event.date >= filterDate);

  const sortedEvents = [...filteredEvents].sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleDelete = (id) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    toast({
      title: "Evento removido",
      description: "O evento foi removido com sucesso.",
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  return (
    <>
      <Helmet>
        <title>Eventos - Coletivo Insônia</title>
        <meta name="description" content="Confira a agenda de shows e eventos do Coletivo Insônia. Não perca as apresentações das melhores bandas da cena alternativa." />
      </Helmet>

      <Navigation />

      <div className="min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-[#2a2a2a] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#D4A574] mb-4">
              Agenda de Eventos
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Fique por dentro dos próximos shows e festivais
            </p>
          </motion.div>

          {/* Filter and Add Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between"
          >
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Filtrar por data
              </label>
              <input
                type="date"
                value={filterDate === 'all' ? '' : filterDate}
                onChange={(e) => setFilterDate(e.target.value || 'all')}
                className="px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
              />
            </div>

            {isAuthenticated && (
              <Button
                onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no próximo prompt! 🚀" })}
                className="bg-gradient-to-r from-[#D4A574] to-[#4A7C59] hover:from-[#c89a68] hover:to-[#3d6a4b] text-white"
              >
                <Plus size={20} className="mr-2" />
                Adicionar Evento
              </Button>
            )}
          </motion.div>

          {/* Events Timeline */}
          <div className="space-y-8">
            {sortedEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-[#D4A574]/20 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Image */}
                  <div className="relative h-64 md:h-auto overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="md:col-span-2 p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-3xl font-bold text-[#D4A574] mb-2">{event.title}</h3>
                        <p className="text-gray-300 mb-4">{event.description}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar size={20} className="text-[#D4A574]" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Clock size={20} className="text-[#D4A574]" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin size={20} className="text-[#D4A574]" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Bandas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {event.bands.map((band, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-[#4A7C59]/20 border border-[#4A7C59] text-[#4A7C59] text-sm rounded-full"
                          >
                            {band}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no próximo prompt! 🚀" })}
                        className="bg-gradient-to-r from-[#D4A574] to-[#4A7C59] hover:from-[#c89a68] hover:to-[#3d6a4b] text-white"
                      >
                        <Ticket size={20} className="mr-2" />
                        Comprar Ingresso
                      </Button>

                      {isAuthenticated && (
                        <>
                          <Button
                            onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no próximo prompt! 🚀" })}
                            variant="outline"
                            className="border-[#4A7C59] text-[#4A7C59] hover:bg-[#4A7C59] hover:text-white"
                          >
                            <Edit size={20} className="mr-2" />
                            Editar
                          </Button>
                          <Button
                            onClick={() => handleDelete(event.id)}
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 size={20} className="mr-2" />
                            Excluir
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {sortedEvents.length === 0 && (
            <div className="text-center py-16">
              <Calendar size={64} className="mx-auto text-gray-600 mb-4" />
              <p className="text-xl text-gray-400">Nenhum evento encontrado</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventsCalendar;