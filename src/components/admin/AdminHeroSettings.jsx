import React, { useState, useEffect } from 'react';
import { Save, Trash2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const DEFAULT_HERO_IMAGE = 'https://images.unsplash.com/photo-1562765722-751e6f76ac82';

const AdminHeroSettings = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [currentImage, setCurrentImage] = useState(DEFAULT_HERO_IMAGE);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem('heroBackgroundImage');
    if (stored) {
      setCurrentImage(stored);
      setImageUrl(stored);
    }
  }, []);

  const handleSave = () => {
    if (!imageUrl.trim()) return;
    
    localStorage.setItem('heroBackgroundImage', imageUrl);
    setCurrentImage(imageUrl);
    toast({
      title: "Sucesso",
      description: "Imagem de fundo do Hero atualizada.",
    });
  };

  const handleReset = () => {
    localStorage.removeItem('heroBackgroundImage');
    setCurrentImage(DEFAULT_HERO_IMAGE);
    setImageUrl('');
    toast({
      title: "Redefinido",
      description: "Imagem restaurada para o padrão.",
    });
  };

  return (
    <div className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <ImageIcon className="text-[#D4A574]" size={24} />
        <h2 className="text-2xl font-bold text-white">Configurações do Hero</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL da Imagem de Fundo
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-3 bg-black/40 border border-[#D4A574]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4A574]"
            />
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleSave}
              className="flex-1 bg-[#D4A574] hover:bg-[#b88d5e] text-black"
            >
              <Save size={18} className="mr-2" />
              Salvar
            </Button>
            <Button
              onClick={handleReset}
              variant="destructive"
              className="flex-1"
            >
              <Trash2 size={18} className="mr-2" />
              Redefinir
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Pré-visualização Atual
          </label>
          <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
            <img
              src={currentImage}
              alt="Hero Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
               <span className="text-white font-bold opacity-50">Overlay Preview</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeroSettings;