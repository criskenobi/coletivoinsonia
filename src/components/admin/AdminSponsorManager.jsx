import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Link as LinkIcon, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const AdminSponsorManager = () => {
  const [sponsors, setSponsors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ name: '', logoUrl: '', websiteUrl: '' });
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem('sponsors');
    if (stored) {
      setSponsors(JSON.parse(stored));
    }
  }, []);

  const saveToStorage = (newSponsors) => {
    localStorage.setItem('sponsors', JSON.stringify(newSponsors));
    setSponsors(newSponsors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      const updatedSponsors = sponsors.map(s => 
        s.id === currentId ? { ...formData, id: currentId } : s
      );
      saveToStorage(updatedSponsors);
      toast({ title: "Sucesso", description: "Patrocinador atualizado." });
    } else {
      const newSponsor = { ...formData, id: Date.now().toString() };
      saveToStorage([...sponsors, newSponsor]);
      toast({ title: "Sucesso", description: "Patrocinador adicionado." });
    }
    resetForm();
  };

  const handleEdit = (sponsor) => {
    setFormData({ name: sponsor.name, logoUrl: sponsor.logoUrl, websiteUrl: sponsor.websiteUrl });
    setCurrentId(sponsor.id);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (confirm('Remover este patrocinador?')) {
      const filtered = sponsors.filter(s => s.id !== id);
      saveToStorage(filtered);
      toast({ title: "Removido", description: "Patrocinador excluído." });
    }
  };

  const resetForm = () => {
    setFormData({ name: '', logoUrl: '', websiteUrl: '' });
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="bg-white/5 border border-[#D4A574]/20 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Gerenciar Patrocinadores</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-black/20 p-6 rounded-lg border border-white/5">
        <h3 className="text-lg font-semibold text-[#D4A574] mb-4">
          {isEditing ? 'Editar Patrocinador' : 'Adicionar Novo'}
        </h3>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Nome da Empresa</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded text-white text-sm"
              placeholder="Ex: Loja de Música"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">URL do Logo</label>
            <input
              required
              type="url"
              value={formData.logoUrl}
              onChange={e => setFormData({...formData, logoUrl: e.target.value})}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded text-white text-sm"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Website</label>
            <input
              type="url"
              value={formData.websiteUrl}
              onChange={e => setFormData({...formData, websiteUrl: e.target.value})}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded text-white text-sm"
              placeholder="https://..."
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button type="submit" size="sm" className="bg-[#4A7C59] hover:bg-[#3d6a4b]">
            <Save size={16} className="mr-2" />
            {isEditing ? 'Atualizar' : 'Adicionar'}
          </Button>
          {isEditing && (
            <Button type="button" size="sm" variant="ghost" onClick={resetForm}>
              <X size={16} className="mr-2" /> Cancelar
            </Button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="space-y-4">
        {sponsors.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Nenhum patrocinador cadastrado.</p>
        ) : (
          <div className="grid gap-4">
            {sponsors.map(sponsor => (
              <div key={sponsor.id} className="flex items-center justify-between bg-black/40 p-4 rounded border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center p-1">
                    <img src={sponsor.logoUrl} alt={sponsor.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{sponsor.name}</h4>
                    <a href={sponsor.websiteUrl} target="_blank" rel="noreferrer" className="text-xs text-[#D4A574] hover:underline flex items-center gap-1">
                      <LinkIcon size={10} /> {sponsor.websiteUrl}
                    </a>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(sponsor)}>
                    <Edit size={16} className="text-blue-400" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(sponsor.id)}>
                    <Trash2 size={16} className="text-red-400" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSponsorManager;