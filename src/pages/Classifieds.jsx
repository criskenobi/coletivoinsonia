import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Filter, SortDesc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import { useToast } from '@/components/ui/use-toast';
import { useClassifieds } from '@/hooks/useClassifieds';
import ClassifiedCard from '@/components/classifieds/ClassifiedCard';
import ClassifiedModal from '@/components/classifieds/ClassifiedModal';
import ClassifiedForm from '@/components/classifieds/ClassifiedForm';
import Footer from '@/components/Footer';

const Classifieds = () => {
  const { ads, createAd } = useClassifieds();
  const { toast } = useToast();
  
  // Filters & Search State
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // UI State
  const [selectedAd, setSelectedAd] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Derived Data
  const categories = [
    ...new Set(ads.map(ad => ad.category))
  ].sort();

  const filteredAds = ads
    .filter(ad => {
      const matchesType = filterType === 'all' || ad.type === filterType;
      const matchesCategory = filterCategory === 'all' || ad.category === filterCategory;
      const matchesSearch = 
        ad.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        ad.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
      return 0;
    });

  const handleCreateAd = (adData) => {
    createAd(adData);
    setIsFormOpen(false);
    toast({
      title: "Anúncio Criado!",
      description: "Seu classificado foi publicado com sucesso.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Classificados - Coletivo Insônia</title>
        <meta name="description" content="Compra, venda, troca e busca por músicos. O mercado da cena independente." />
      </Helmet>

      <Navigation />

      <div className="min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-[#2a2a2a] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#D4A574] mb-4">
              Classificados
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Equipamentos, instrumentos e músicos. Conecte-se com a cena.
            </p>
          </motion.div>

          {/* Controls Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md border border-[#D4A574]/20 rounded-xl p-6 mb-12 shadow-lg"
          >
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
              
              {/* Left: Filters */}
              <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                <div className="flex bg-black/40 rounded-lg p-1 border border-white/10">
                  <button
                    onClick={() => setFilterType('all')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filterType === 'all' ? 'bg-[#D4A574] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setFilterType('sale')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filterType === 'sale' ? 'bg-[#D4A574] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                  >
                    Venda/Troca
                  </button>
                  <button
                    onClick={() => setFilterType('musician')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filterType === 'musician' ? 'bg-[#D4A574] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                  >
                    Músicos
                  </button>
                </div>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#D4A574]"
                >
                  <option value="all">Todas Categorias</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Right: Search & Action */}
              <div className="flex gap-4 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#D4A574]"
                  />
                </div>

                <Button
                  onClick={() => setIsFormOpen(true)}
                  className="bg-gradient-to-r from-[#D4A574] to-[#4A7C59] hover:from-[#c89a68] hover:to-[#3d6a4b] text-white whitespace-nowrap"
                >
                  <Plus size={18} className="mr-2" />
                  Anunciar
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Create Ad Form Modal/Overlay */}
          <AnimatePresence>
            {isFormOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-12 overflow-hidden"
              >
                <ClassifiedForm 
                  onSubmit={handleCreateAd} 
                  onCancel={() => setIsFormOpen(false)} 
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredAds.map((ad) => (
                <ClassifiedCard 
                  key={ad.id} 
                  ad={ad} 
                  onClick={() => setSelectedAd(ad)} 
                />
              ))}
            </AnimatePresence>
          </div>

          {filteredAds.length === 0 && (
            <div className="text-center py-20">
              <Filter size={48} className="mx-auto text-gray-600 mb-4" />
              <p className="text-xl text-gray-400">Nenhum anúncio encontrado com estes filtros.</p>
              <button 
                onClick={() => {setFilterType('all'); setSearchTerm('');}}
                className="text-[#D4A574] hover:underline mt-2"
              >
                Limpar filtros
              </button>
            </div>
          )}

          {/* Details Modal */}
          <ClassifiedModal 
            ad={selectedAd} 
            isOpen={!!selectedAd} 
            onClose={() => setSelectedAd(null)} 
          />

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Classifieds;