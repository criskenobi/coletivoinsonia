import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Music, Calendar, Image, MessageSquare, FileEdit, BarChart, ShoppingBag, Trash2, CheckCircle, XCircle, Settings, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import { useToast } from '@/components/ui/use-toast';
import { useClassifieds } from '@/hooks/useClassifieds';
import { Button } from '@/components/ui/button';
import AdminHeroSettings from '@/components/admin/AdminHeroSettings';
import AdminSponsorManager from '@/components/admin/AdminSponsorManager';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [bands, setBands] = useState([]);
  const [events, setEvents] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  
  // Use the classifieds hook
  const { ads, deleteAd, toggleStatus } = useClassifieds();

  useEffect(() => {
    const storedBands = localStorage.getItem('bands');
    const storedEvents = localStorage.getItem('events');
    const storedSubmissions = localStorage.getItem('contactSubmissions');

    if (storedBands) setBands(JSON.parse(storedBands));
    if (storedEvents) setEvents(JSON.parse(storedEvents));
    if (storedSubmissions) setSubmissions(JSON.parse(storedSubmissions));
  }, []);

  const stats = [
    { label: 'Total de Bandas', value: bands.length, icon: Music, color: '#D4A574' },
    { label: 'Eventos Agendados', value: events.length, icon: Calendar, color: '#4A7C59' },
    { label: 'Classificados', value: ads.length, icon: ShoppingBag, color: '#D4A574' },
    { label: 'Submissões', value: submissions.length, icon: MessageSquare, color: '#4A7C59' },
  ];

  const handleDeleteAd = (id) => {
    if(confirm('Tem certeza que deseja excluir este anúncio?')) {
      deleteAd(id);
      toast({ title: "Anúncio excluído", description: "O anúncio foi removido permanentemente." });
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Coletivo Insônia</title>
        <meta name="description" content="Painel administrativo do Coletivo Insônia" />
      </Helmet>

      <Navigation />

      <div className="min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-[#2a2a2a] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-bold text-[#D4A574] mb-2">
              Painel Administrativo
            </h1>
            <p className="text-xl text-gray-300">
              Bem-vindo, {currentUser?.username}!
            </p>
          </motion.div>

          {/* Navigation Tabs (if not on overview) */}
          {activeTab !== 'overview' && (
             <div className="mb-6">
                <button
                  onClick={() => setActiveTab('overview')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  ← Voltar ao Resumo
                </button>
             </div>
          )}

          {/* Stats Overview */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-lg border border-[#D4A574]/20 rounded-xl p-6 hover:border-[#D4A574]/40 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon size={32} style={{ color: stat.color }} />
                      <span className="text-3xl font-bold text-white">{stat.value}</span>
                    </div>
                    <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.button
                  onClick={() => setActiveTab('bands')}
                  className="bg-gradient-to-br from-[#D4A574]/10 to-[#4A7C59]/10 border border-[#D4A574]/20 rounded-xl p-6 hover:border-[#D4A574]/50 transition-all duration-300 text-left group"
                >
                  <Music size={32} className="text-[#D4A574] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-2">Gerenciar Bandas</h3>
                </motion.button>

                <motion.button
                  onClick={() => setActiveTab('classifieds')}
                  className="bg-gradient-to-br from-[#D4A574]/10 to-[#4A7C59]/10 border border-[#D4A574]/20 rounded-xl p-6 hover:border-[#D4A574]/50 transition-all duration-300 text-left group"
                >
                  <ShoppingBag size={32} className="text-[#D4A574] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-2">Gerenciar Classificados</h3>
                </motion.button>

                <motion.button
                  onClick={() => setActiveTab('submissions')}
                  className="bg-gradient-to-br from-[#D4A574]/10 to-[#4A7C59]/10 border border-[#D4A574]/20 rounded-xl p-6 hover:border-[#D4A574]/50 transition-all duration-300 text-left group"
                >
                  <MessageSquare size={32} className="text-[#4A7C59] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-2">Submissões</h3>
                </motion.button>

                <motion.button
                  onClick={() => setActiveTab('hero')}
                  className="bg-gradient-to-br from-[#D4A574]/10 to-[#4A7C59]/10 border border-[#D4A574]/20 rounded-xl p-6 hover:border-[#D4A574]/50 transition-all duration-300 text-left group"
                >
                  <Settings size={32} className="text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-2">Configurar Hero</h3>
                </motion.button>

                <motion.button
                  onClick={() => setActiveTab('sponsors')}
                  className="bg-gradient-to-br from-[#D4A574]/10 to-[#4A7C59]/10 border border-[#D4A574]/20 rounded-xl p-6 hover:border-[#D4A574]/50 transition-all duration-300 text-left group"
                >
                  <Users size={32} className="text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-2">Patrocinadores</h3>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Render Tabs */}
          {activeTab === 'hero' && <AdminHeroSettings />}
          
          {activeTab === 'sponsors' && <AdminSponsorManager />}

          {activeTab === 'classifieds' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1a1a1a] border border-[#D4A574]/20 rounded-xl overflow-hidden"
            >
              <div className="p-6 border-b border-[#D4A574]/20 bg-black/20">
                <h2 className="text-2xl font-bold text-[#D4A574]">Gerenciar Classificados</h2>
                <p className="text-gray-400 text-sm mt-1">Total: {ads.length} anúncios</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-gray-400 text-sm uppercase">
                    <tr>
                      <th className="p-4">Título</th>
                      <th className="p-4">Tipo</th>
                      <th className="p-4">Data</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D4A574]/10">
                    {ads.map((ad) => (
                      <tr key={ad.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <p className="text-white font-medium">{ad.title}</p>
                          <p className="text-gray-500 text-xs">{ad.category}</p>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${ad.type === 'sale' ? 'bg-[#D4A574]/20 text-[#D4A574]' : 'bg-[#4A7C59]/20 text-[#4A7C59]'}`}>
                            {ad.type === 'sale' ? 'Venda' : 'Músico'}
                          </span>
                        </td>
                        <td className="p-4 text-gray-400 text-sm">
                          {new Date(ad.date).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="p-4">
                           <span className={`px-2 py-1 rounded text-xs font-bold ${
                             ad.status === 'active' ? 'text-green-400 border border-green-400/30' : 
                             ad.status === 'sold' ? 'text-gray-400 border border-gray-400/30' :
                             'text-blue-400 border border-blue-400/30'
                           }`}>
                            {ad.status === 'active' ? 'Ativo' : ad.status === 'sold' ? 'Vendido' : 'Preenchido'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                             {ad.status === 'active' ? (
                               <Button 
                                 size="sm" 
                                 variant="outline" 
                                 onClick={() => toggleStatus(ad.id, ad.type === 'sale' ? 'sold' : 'filled')}
                                 className="h-8 border-gray-600 text-gray-400 hover:text-white"
                                 title="Marcar como Vendido/Preenchido"
                               >
                                 <XCircle size={16} />
                               </Button>
                             ) : (
                                <Button 
                                 size="sm" 
                                 variant="outline" 
                                 onClick={() => toggleStatus(ad.id, 'active')}
                                 className="h-8 border-green-600 text-green-400 hover:text-green-300"
                                 title="Reativar"
                               >
                                 <CheckCircle size={16} />
                               </Button>
                             )}
                             <Button 
                               size="sm" 
                               variant="destructive" 
                               onClick={() => handleDeleteAd(ad.id)}
                               className="h-8"
                               title="Excluir"
                             >
                               <Trash2 size={16} />
                             </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {ads.length === 0 && (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-gray-500">
                          Nenhum anúncio encontrado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'submissions' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-bold text-[#D4A574] mb-6">Submissões Recebidas</h2>
              {submissions.length === 0 ? (
                <div className="text-center py-16 bg-white/5 rounded-xl border border-[#D4A574]/20">
                  <MessageSquare size={48} className="mx-auto text-gray-600 mb-4" />
                  <p className="text-xl text-gray-400">Nenhuma submissão ainda</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {submissions.map((submission, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-lg border border-[#D4A574]/20 rounded-xl p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className="px-3 py-1 bg-[#D4A574]/20 text-[#D4A574] text-sm rounded-full">
                          {submission.type}
                        </span>
                        <span className="text-gray-500 text-sm">
                           {new Date(submission.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-gray-300 space-y-1">
                        <p><strong>Nome:</strong> {submission.name || submission.bandName || submission.eventName}</p>
                        <p><strong>Email:</strong> {submission.email}</p>
                        <p className="mt-2 text-sm text-gray-400">{submission.message || submission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'bands' && (
             <div className="text-center py-16 text-gray-500 bg-white/5 rounded-xl border border-[#D4A574]/20">
               <Music size={48} className="mx-auto mb-4 opacity-50" />
               <p>Funcionalidade de bandas (Visualização Simplificada)</p>
               <p className="text-sm mt-2">Use a página principal de bandas para adicionar/remover.</p>
             </div>
          )}

        </div>
      </div>
    </>
  );
};

export default AdminDashboard;