import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SponsorLogos = () => {
  const [sponsors, setSponsors] = useState([]);

  // Default data to seed if localStorage is empty
  const defaultSponsors = [
    {
      id: '1',
      name: 'AudioTech Pro',
      logoUrl: 'https://placehold.co/400x200/1a1a1a/D4A574?text=AudioTech',
      websiteUrl: '#'
    },
    {
      id: '2',
      name: 'Vinyl Haven',
      logoUrl: 'https://placehold.co/400x200/1a1a1a/4A7C59?text=Vinyl+Haven',
      websiteUrl: '#'
    },
    {
      id: '3',
      name: 'Indie Gear',
      logoUrl: 'https://placehold.co/400x200/1a1a1a/D4A574?text=Indie+Gear',
      websiteUrl: '#'
    },
    {
      id: '4',
      name: 'Underground Press',
      logoUrl: 'https://placehold.co/400x200/1a1a1a/4A7C59?text=Underground',
      websiteUrl: '#'
    }
  ];

  useEffect(() => {
    try {
      const storedSponsors = localStorage.getItem('sponsors');
      if (storedSponsors) {
        const parsed = JSON.parse(storedSponsors);
        // Ensure we actually have an array and it's not empty
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSponsors(parsed);
        } else {
          // If array is empty, seed defaults
          setSponsors(defaultSponsors);
          localStorage.setItem('sponsors', JSON.stringify(defaultSponsors));
        }
      } else {
        // No key exists, seed defaults
        setSponsors(defaultSponsors);
        localStorage.setItem('sponsors', JSON.stringify(defaultSponsors));
      }
    } catch (error) {
      console.error("Error loading sponsors:", error);
      // Fallback to defaults on error
      setSponsors(defaultSponsors);
    }
  }, []);

  if (!sponsors || sponsors.length === 0) return null;

  return (
    <div className="py-20 border-t border-[#D4A574]/10 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-sm font-bold text-[#D4A574] uppercase tracking-[0.2em] mb-2">
            Nossos Parceiros
          </h3>
          <h2 className="text-2xl font-bold text-white">
            Marcas que Apoiam a Cena
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center">
          {sponsors.map((sponsor, index) => (
            <motion.a
              key={sponsor.id || index}
              href={sponsor.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, filter: 'grayscale(0%)', opacity: 1 }}
              className="group w-full flex flex-col items-center justify-center p-6 rounded-xl border border-transparent hover:border-[#D4A574]/10 hover:bg-white/5 transition-all duration-300 grayscale opacity-50 hover:opacity-100"
            >
              <div className="h-20 w-full flex items-center justify-center mb-4">
                {sponsor.logoUrl ? (
                  <img
                    src={sponsor.logoUrl}
                    alt={sponsor.name}
                    className="max-h-full max-w-full object-contain drop-shadow-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                {/* Fallback text if image fails or doesn't exist */}
                <div 
                  className="w-full h-full bg-white/5 rounded flex items-center justify-center text-xs text-gray-400 font-bold border border-white/10"
                  style={{ display: sponsor.logoUrl ? 'none' : 'flex' }}
                >
                  {sponsor.name}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorLogos;