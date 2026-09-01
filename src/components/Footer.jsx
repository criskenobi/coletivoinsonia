import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Music } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-[#D4A574]/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-[#D4A574] font-bold text-2xl">Coletivo Insônia</span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6">
              O espaço onde a música alternativa ganha vida. Conectando artistas, fãs e a cultura underground em um só lugar.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4A574] transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4A574] transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4A574] transition-colors">
                <Youtube size={24} />
              </a>
              <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4A574] transition-colors">
                <Music size={24} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-[#D4A574] transition-colors">Início</Link></li>
              <li><Link to="/bandas" className="text-gray-400 hover:text-[#D4A574] transition-colors">Bandas</Link></li>
              <li><Link to="/eventos" className="text-gray-400 hover:text-[#D4A574] transition-colors">Eventos</Link></li>
              <li><Link to="/classificados" className="text-gray-400 hover:text-[#D4A574] transition-colors">Classificados</Link></li>
            </ul>
          </div>

          {/* Institutional */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Institucional</h3>
            <ul className="space-y-2">
              <li><Link to="/sobre" className="text-gray-400 hover:text-[#D4A574] transition-colors">Sobre Nós</Link></li>
              <li><Link to="/galeria" className="text-gray-400 hover:text-[#D4A574] transition-colors">Galeria</Link></li>
              <li><Link to="/contato" className="text-gray-400 hover:text-[#D4A574] transition-colors">Contato</Link></li>
              <li><Link to="/admin/login" className="text-gray-400 hover:text-[#D4A574] transition-colors">Área Admin</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Coletivo Insônia. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <span className="hover:text-gray-300 cursor-pointer">Termos de Uso</span>
            <span className="hover:text-gray-300 cursor-pointer">Privacidade</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;