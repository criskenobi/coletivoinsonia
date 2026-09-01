import { useState, useEffect } from 'react';

const initialAds = [
  {
    id: '1',
    title: 'Guitarra Fender Stratocaster',
    description: 'Vendo Fender Stratocaster mexicana em ótimo estado. Captadores originais, regulada recentemente.',
    type: 'sale',
    category: 'Instrumentos',
    price: '3500',
    image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f',
    contactName: 'João Silva',
    contactPhone: '11999999999',
    contactEmail: 'joao@email.com',
    contactInstagram: '@joaoguitar',
    date: '2026-02-01T10:00:00.000Z',
    status: 'active'
  },
  {
    id: '2',
    title: 'Procura-se Baterista',
    description: 'Banda de Rock Alternativo com material autoral procura baterista com experiência e equipamento próprio.',
    type: 'musician',
    category: 'Baterista',
    price: '',
    image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7',
    contactName: 'Banda Eclipse',
    contactPhone: '11988888888',
    contactEmail: 'contato@eclipse.com',
    contactInstagram: '@bandaeclipse',
    date: '2026-02-03T15:30:00.000Z',
    status: 'active'
  },
  {
    id: '3',
    title: 'Pedaleira Boss GT-100',
    description: 'Troco por amplificador de guitarra ou vendo. Acompanha fonte original e bag.',
    type: 'sale',
    category: 'Equipamento',
    price: '1800',
    image: 'https://images.unsplash.com/photo-1550985543-f47f38aee65d',
    contactName: 'Pedro Santos',
    contactPhone: '11977777777',
    contactEmail: 'pedro@email.com',
    contactInstagram: '@pedropedais',
    date: '2026-01-28T09:00:00.000Z',
    status: 'sold'
  }
];

export const useClassifieds = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const storedAds = localStorage.getItem('classifieds');
    if (storedAds) {
      setAds(JSON.parse(storedAds));
    } else {
      setAds(initialAds);
      localStorage.setItem('classifieds', JSON.stringify(initialAds));
    }
  }, []);

  const saveAds = (newAds) => {
    setAds(newAds);
    localStorage.setItem('classifieds', JSON.stringify(newAds));
  };

  const getAds = () => ads;

  const createAd = (adData) => {
    const newAd = {
      ...adData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'active'
    };
    const newAds = [newAd, ...ads];
    saveAds(newAds);
    return newAd;
  };

  const updateAd = (id, updatedData) => {
    const newAds = ads.map(ad => 
      ad.id === id ? { ...ad, ...updatedData } : ad
    );
    saveAds(newAds);
  };

  const deleteAd = (id) => {
    const newAds = ads.filter(ad => ad.id !== id);
    saveAds(newAds);
  };

  const toggleStatus = (id, newStatus) => {
    const newAds = ads.map(ad => 
      ad.id === id ? { ...ad, status: newStatus } : ad
    );
    saveAds(newAds);
  };

  return {
    ads,
    getAds,
    createAd,
    updateAd,
    deleteAd,
    toggleStatus
  };
};