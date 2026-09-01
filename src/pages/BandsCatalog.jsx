import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, Music, Instagram, Youtube, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const initialBands = [
  {
    id: 1,
    name: 'Banda Noturna',
    genre: 'Rock Alternativo',
    description: 'Som pesado e letras introspectivas que exploram os limites da música independente.',
    image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    spotify: 'https://spotify.com',
  },
  {
    id: 2,
    name: 'Eclipse Sonoro',
    genre: 'Indie Pop',
    description: 'Melodias envolventes e performances energéticas que conquistam o público.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    spotify: 'https://spotify.com',
  },
  {
    id: 3,
    name: 'Reverberação',
    genre: 'Post-Punk',
    description: 'Experimentação sonora com influências do underground brasileiro.',
    image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    spotify: 'https://spotify.com',
  },
  {
    id: 4,
    name: 'Onda Magnética',
    genre: 'Shoegaze',
    description: 'Paisagens sonoras etéreas e guitarras distorcidas em perfeita harmonia.',
    image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    spotify: 'https://spotify.com',
  },
];

const BandsCatalog = () => {
  const [bands, setBands] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const storedBands = localStorage.getItem('bands');
    if (storedBands) {
      setBands(JSON.parse(storedBands));
    } else {
      setBands(initialBands);
      localStorage.setItem('bands', JSON.stringify(initialBands));
    }
  }, []);

  const genres = ['all', ...new Set(bands.map(band => band.genre))];

  const filteredBands = bands.filter(band => {
    const matchesSearch = band.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         band.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || band.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handleDelete = (id) => {
    const updatedBands = bands.filter(band => band.id !== id);
    setBands(updatedBands);
    localStorage.setItem('bands', JSON.stringify(updatedBands));
    toast({
      title: "Banda removida",
      description: "A banda foi removida com sucesso.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Bandas - Coletivo Insônia</title>
        <meta name="description" content="Conheça as bandas que fazem parte do Coletivo Insônia, um espaço de música alternativa e cultura underground." />
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
              Nossas Bandas
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Conheça os artistas que formam o coração do Coletivo Insônia
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between"
          >
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar bandas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
              />
            </div>

            <div className="flex gap-4 items-center w-full md:w-auto">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="flex-1 md:flex-none px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre} className="bg-black">
                    {genre === 'all' ? 'Todos os Gêneros' : genre}
                  </option>
                ))}
              </select>

              {isAuthenticated && (
                <Button
                  onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no próximo prompt! 🚀" })}
                  className="bg-gradient-to-r from-[#D4A574] to-[#4A7C59] hover:from-[#c89a68] hover:to-[#3d6a4b] text-white"
                >
                  <Plus size={20} className="mr-2" />
                  Adicionar Banda
                </Button>
              )}
            </div>
          </motion.div>

          {/* Bands Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBands.map((band, index) => (
              <motion.div
                key={band.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-[#D4A574]/20 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={band.image}
                    alt={band.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-[#D4A574] text-black text-sm font-semibold rounded-full">
                      {band.genre}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#D4A574] mb-2">{band.name}</h3>
                  <p className="text-gray-300 mb-4">{band.description}</p>

                  <div className="flex items-center gap-3 mb-4">
                    <a
                      href={band.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 rounded-lg hover:bg-[#D4A574]/20 transition-colors"
                    >
                      <Instagram size={20} className="text-[#D4A574]" />
                    </a>
                    <a
                      href={band.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 rounded-lg hover:bg-[#D4A574]/20 transition-colors"
                    >
                      <Youtube size={20} className="text-[#D4A574]" />
                    </a>
                    <a
                      href={band.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 rounded-lg hover:bg-[#D4A574]/20 transition-colors"
                    >
                      <Music size={20} className="text-[#D4A574]" />
                    </a>
                  </div>

                  {isAuthenticated && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no próximo prompt! 🚀" })}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-[#4A7C59] text-[#4A7C59] hover:bg-[#4A7C59] hover:text-white"
                      >
                        <Edit size={16} className="mr-1" />
                        Editar
                      </Button>
                      <Button
                        onClick={() => handleDelete(band.id)}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={16} className="mr-1" />
                        Excluir
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredBands.length === 0 && (
            <div className="text-center py-16">
              <Music size={64} className="mx-auto text-gray-600 mb-4" />
              <p className="text-xl text-gray-400">Nenhuma banda encontrada</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BandsCatalog;