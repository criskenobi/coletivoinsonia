import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = {
  sale: ['Instrumentos', 'Equipamento', 'Acessórios', 'Vinil/CDs', 'Outros'],
  musician: ['Guitarrista', 'Baixista', 'Baterista', 'Vocalista', 'Tecladista', 'Produtor', 'Outros']
};

const ClassifiedForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'sale',
    category: 'Instrumentos',
    price: '',
    description: '',
    image: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactInstagram: '',
    status: 'active'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset category if type changes
      ...(name === 'type' && { category: categories[value][0] })
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#D4A574]/20">
      <h2 className="text-2xl font-bold text-[#D4A574] mb-6">
        {initialData ? 'Editar Anúncio' : 'Novo Anúncio'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Título do Anúncio</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
              placeholder="Ex: Guitarra Les Paul ou Procuro Banda"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tipo</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
            >
              <option value="sale" className="bg-black">Venda / Troca</option>
              <option value="musician" className="bg-black">Busca por Músico</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Categoria</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
            >
              {categories[formData.type].map(cat => (
                <option key={cat} value={cat} className="bg-black">{cat}</option>
              ))}
            </select>
          </div>

          {formData.type === 'sale' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Preço (R$)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
                placeholder="0,00"
              />
            </div>
          )}

          <div className={formData.type === 'sale' ? '' : 'md:col-span-2'}>
            <label className="block text-sm font-medium text-gray-300 mb-2">URL da Imagem</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
              placeholder="https://..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Descrição Detalhada</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all resize-none"
            placeholder="Descreva seu item ou o que procura..."
          />
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/10 pt-6">
          <h3 className="text-lg font-semibold text-[#D4A574] mb-4">Informações de Contato</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nome</label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Telefone / WhatsApp</label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
                placeholder="11999999999"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Instagram (Opcional)</label>
              <input
                type="text"
                name="contactInstagram"
                value={formData.contactInstagram}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-[#D4A574]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
                placeholder="@usuario"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            className="flex-1 bg-gradient-to-r from-[#D4A574] to-[#4A7C59] hover:from-[#c89a68] hover:to-[#3d6a4b] text-white py-6"
          >
            <Save className="mr-2" size={20} />
            {initialData ? 'Salvar Alterações' : 'Criar Anúncio'}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="flex-1 border-gray-500 text-gray-400 hover:text-white py-6"
          >
            <X className="mr-2" size={20} />
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ClassifiedForm;