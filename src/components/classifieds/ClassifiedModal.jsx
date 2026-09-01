import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag, User, DollarSign, Mail, Phone, Instagram, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ClassifiedModal = ({ ad, isOpen, onClose }) => {
  if (!isOpen || !ad) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative w-full max-w-3xl bg-[#1a1a1a] border border-[#D4A574]/20 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-[#D4A574] hover:text-black transition-colors"
          >
            <X size={24} />
          </button>

          {/* Image */}
          <div className="relative h-64 sm:h-80 w-full">
            <img
              src={ad.image || 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80'}
              alt={ad.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6">
               <span className="inline-block px-3 py-1 mb-2 rounded-full bg-[#D4A574] text-black text-xs font-bold uppercase tracking-wider">
                 {ad.category}
               </span>
               <h2 className="text-3xl font-bold text-white">{ad.title}</h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 grid md:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar size={16} className="text-[#D4A574]" />
                  <span>Publicado em {new Date(ad.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag size={16} className="text-[#D4A574]" />
                  <span>{ad.type === 'sale' ? 'Venda/Troca' : 'Busca por Músico'}</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#D4A574] mb-2">Descrição</h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {ad.description}
                </p>
              </div>

              {ad.type === 'sale' && (
                <div className="p-4 bg-white/5 rounded-xl border border-[#D4A574]/20 inline-block">
                  <p className="text-sm text-gray-400 mb-1">Valor</p>
                  <p className="text-3xl font-bold text-[#D4A574]">
                    {ad.price ? `R$ ${ad.price}` : 'A Combinar'}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar / Contact */}
            <div className="space-y-6">
              <div className="bg-white/5 rounded-xl p-6 border border-[#D4A574]/10">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <User size={20} className="text-[#D4A574]" />
                  Contato
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User size={18} className="text-gray-500 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Nome</p>
                      <p className="text-gray-200">{ad.contactName}</p>
                    </div>
                  </div>

                  {ad.contactEmail && (
                    <div className="flex items-start gap-3">
                      <Mail size={18} className="text-gray-500 mt-1" />
                      <div className="overflow-hidden">
                        <p className="text-xs text-gray-500 uppercase">Email</p>
                        <a href={`mailto:${ad.contactEmail}`} className="text-[#D4A574] hover:underline truncate block">
                          {ad.contactEmail}
                        </a>
                      </div>
                    </div>
                  )}

                  {ad.contactPhone && (
                    <div className="flex items-start gap-3">
                      <Phone size={18} className="text-gray-500 mt-1" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Telefone / WhatsApp</p>
                        <a href={`https://wa.me/55${ad.contactPhone.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" className="text-[#D4A574] hover:underline">
                          {ad.contactPhone}
                        </a>
                      </div>
                    </div>
                  )}

                  {ad.contactInstagram && (
                    <div className="flex items-start gap-3">
                      <Instagram size={18} className="text-gray-500 mt-1" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Instagram</p>
                        <a href={`https://instagram.com/${ad.contactInstagram.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="text-[#D4A574] hover:underline">
                          {ad.contactInstagram}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={() => window.open(`https://wa.me/55${ad.contactPhone?.replace(/\D/g,'') || ''}`, '_blank')}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3"
              >
                <Phone className="mr-2" size={18} />
                Entrar em Contato
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ClassifiedModal;