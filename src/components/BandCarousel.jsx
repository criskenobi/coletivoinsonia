import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BandCarousel = () => {
  const [bands, setBands] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const storedBands = localStorage.getItem('bands');
    if (storedBands) {
      setBands(JSON.parse(storedBands));
    }
  }, []);

  if (bands.length === 0) {
    return (
      <div className="py-12 text-center bg-white/5 rounded-xl border border-[#D4A574]/20 mx-4">
        <Music size={48} className="mx-auto text-gray-600 mb-4" />
        <p className="text-gray-400">Nenhuma banda em destaque no momento.</p>
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bands.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bands.length) % bands.length);
  };

  const currentBand = bands[currentIndex];

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-12">
      <div className="relative h-[500px] md:h-[400px] bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#D4A574]/20 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col md:flex-row"
          >
            {/* Image Side */}
            <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden">
              <img
                src={currentBand.image}
                alt={currentBand.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-transparent to-transparent" />
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-gradient-to-b md:bg-gradient-to-l from-black via-[#1a1a1a] to-transparent">
              <span className="text-[#4A7C59] font-bold text-sm tracking-wider uppercase mb-2">
                Artista em Destaque
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-[#D4A574] mb-2">
                {currentBand.name}
              </h3>
              <p className="text-gray-400 text-sm font-medium mb-4">{currentBand.genre}</p>
              <p className="text-gray-300 mb-6 line-clamp-3 md:line-clamp-4 leading-relaxed">
                {currentBand.description}
              </p>
              
              <Link to="/bandas">
                <Button className="bg-[#D4A574] hover:bg-[#b88d5e] text-black font-bold">
                  Ver Perfil Completo
                </Button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#D4A574] text-white hover:text-black p-2 rounded-full transition-all backdrop-blur-sm z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#D4A574] text-white hover:text-black p-2 rounded-full transition-all backdrop-blur-sm z-10"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {bands.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-[#D4A574] w-6' : 'bg-gray-600 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BandCarousel;