import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, User, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

const ClassifiedCard = ({ ad, onClick }) => {
  const statusColors = {
    active: 'bg-green-500/20 text-green-400 border-green-500/30',
    sold: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    filled: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  };

  const typeColors = {
    sale: 'bg-[#D4A574]/20 text-[#D4A574] border-[#D4A574]/30',
    musician: 'bg-[#4A7C59]/20 text-[#4A7C59] border-[#4A7C59]/30'
  };

  const statusLabel = {
    active: 'Disponível',
    sold: 'Vendido',
    filled: 'Preenchido'
  };

  const typeLabel = {
    sale: 'Venda/Troca',
    musician: 'Músicos'
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={onClick}
      className="group cursor-pointer bg-white/5 backdrop-blur-lg border border-[#D4A574]/20 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#D4A574]/40 transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-black/50">
        <img
          src={ad.image || 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80'}
          alt={ad.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={cn("px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider border backdrop-blur-md", typeColors[ad.type])}>
            {typeLabel[ad.type]}
          </span>
          <span className={cn("px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider border backdrop-blur-md", statusColors[ad.status])}>
            {statusLabel[ad.status]}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-[#D4A574] transition-colors line-clamp-1">
            {ad.title}
          </h3>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Tag size={14} className="text-gray-400" />
          <span className="text-sm text-gray-400">{ad.category}</span>
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-2 h-10">
          {ad.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
          {ad.type === 'sale' && ad.price && (
            <div className="flex items-center gap-1 text-[#D4A574] font-bold">
              <DollarSign size={16} />
              <span>R$ {ad.price}</span>
            </div>
          )}
          {ad.type === 'musician' && (
             <div className="flex items-center gap-1 text-[#4A7C59] font-bold text-sm">
               <User size={16} />
               <span>Vaga</span>
             </div>
          )}
          
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar size={12} />
            <span>{new Date(ad.date).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClassifiedCard;