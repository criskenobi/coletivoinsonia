import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Edit, Trash2, Image as ImageIcon, Video } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const initialGalleryItems = [
  {
    id: 1,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1568217046110-facb9c946c75',
    title: 'Festival Insônia 2025',
    date: '2025-12-15',
    event: 'Festival Insônia',
  },
  {
    id: 2,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1661820947074-d74f804ef37b',
    title: 'Show Banda Noturna',
    date: '2025-11-20',
    event: 'Noite Acústica',
  },
  {
    id: 3,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1570477699038-9e94e33b1746',
    title: 'Eclipse Sonoro ao Vivo',
    date: '2025-10-30',
    event: 'Rock na Praça',
  },
  {
    id: 4,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1576077680671-c67602a6355c',
    title: 'Público em Êxtase',
    date: '2025-09-18',
    event: 'Festival Insônia',
  },
  {
    id: 5,
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'Highlights Festival 2025',
    date: '2025-12-20',
    event: 'Festival Insônia',
  },
  {
    id: 6,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4',
    title: 'Backstage Moments',
    date: '2025-11-15',
    event: 'Noite Acústica',
  },
];

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [filterEvent, setFilterEvent] = useState('all');
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const storedItems = localStorage.getItem('galleryItems');
    if (storedItems) {
      setGalleryItems(JSON.parse(storedItems));
    } else {
      setGalleryItems(initialGalleryItems);
      localStorage.setItem('galleryItems', JSON.stringify(initialGalleryItems));
    }
  }, []);

  const events = ['all', ...new Set(galleryItems.map(item => item.event))];

  const filteredItems = galleryItems.filter(item => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesEvent = filterEvent === 'all' || item.event === filterEvent;
    return matchesType && matchesEvent;
  });

  const handleDelete = (id) => {
    const updatedItems = galleryItems.filter(item => item.id !== id);
    setGalleryItems(updatedItems);
    localStorage.setItem('galleryItems', JSON.stringify(updatedItems));
    setSelectedItem(null);
    toast({
      title: "Item removido",
      description: "O item foi removido da galeria com sucesso.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Galeria - Coletivo Insônia</title>
        <meta name="description" content="Explore fotos e vídeos dos shows e eventos do Coletivo Insônia. Reviva os melhores momentos da cena alternativa." />
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
              Galeria
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Momentos inesquecíveis dos nossos shows e eventos
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between"
          >
            <div className="flex gap-4 w-full md:w-auto">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="flex-1 md:flex-none px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
              >
                <option value="all" className="bg-black">Todos os Tipos</option>
                <option value="image" className="bg-black">Fotos</option>
                <option value="video" className="bg-black">Vídeos</option>
              </select>

              <select
                value={filterEvent}
                onChange={(e) => setFilterEvent(e.target.value)}
                className="flex-1 md:flex-none px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
              >
                {events.map(event => (
                  <option key={event} value={event} className="bg-black">
                    {event === 'all' ? 'Todos os Eventos' : event}
                  </option>
                ))}
              </select>
            </div>

            {isAuthenticated && (
              <Button
                onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no próximo prompt! 🚀" })}
                className="bg-gradient-to-r from-[#D4A574] to-[#4A7C59] hover:from-[#c89a68] hover:to-[#3d6a4b] text-white"
              >
                <Plus size={20} className="mr-2" />
                Adicionar Item
              </Button>
            )}
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative group cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative h-64 rounded-xl overflow-hidden bg-white/5 border border-[#D4A574]/20 shadow-lg hover:shadow-2xl transition-all duration-300">
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-black">
                      <Video size={48} className="text-[#D4A574]" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-300 text-sm">{item.event}</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    {item.type === 'video' && (
                      <div className="bg-[#D4A574] text-black px-2 py-1 rounded text-xs font-semibold">
                        VÍDEO
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <ImageIcon size={64} className="mx-auto text-gray-600 mb-4" />
              <p className="text-xl text-gray-400">Nenhum item encontrado</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute -top-12 right-0 text-white hover:text-[#D4A574] transition-colors"
              >
                <X size={32} />
              </button>

              <div className="bg-white/5 backdrop-blur-xl rounded-xl overflow-hidden border border-[#D4A574]/20">
                {selectedItem.type === 'image' ? (
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    className="w-full max-h-[80vh] object-contain"
                  />
                ) : (
                  <div className="aspect-video">
                    <iframe
                      src={selectedItem.url}
                      title={selectedItem.title}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#D4A574] mb-2">{selectedItem.title}</h3>
                  <p className="text-gray-300 mb-4">{selectedItem.event} • {selectedItem.date}</p>

                  {isAuthenticated && (
                    <div className="flex gap-3">
                      <Button
                        onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no próximo prompt! 🚀" })}
                        variant="outline"
                        className="border-[#4A7C59] text-[#4A7C59] hover:bg-[#4A7C59] hover:text-white"
                      >
                        <Edit size={20} className="mr-2" />
                        Editar
                      </Button>
                      <Button
                        onClick={() => handleDelete(selectedItem.id)}
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={20} className="mr-2" />
                        Excluir
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default Gallery;