import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const navLinks = [
    { path: '/', label: 'Início' },
    { path: '/bandas', label: 'Bandas' },
    { path: '/eventos', label: 'Eventos' },
    { path: '/classificados', label: 'Classificados' },
    { path: '/galeria', label: 'Galeria' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/contato', label: 'Contato' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#D4A574]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://horizons-cdn.hostinger.com/e8c1ba09-53cc-4470-8aed-f7b40fd7dab0/ee3a16884383071b6edfe2f275faa41f.png" 
              alt="Coletivo Insônia" 
              className="h-10 w-auto"
            />
            <span className="text-[#D4A574] font-bold text-xl hidden sm:block">Coletivo Insônia</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 relative group ${
                  isActive(link.path) ? 'text-[#D4A574]' : 'text-white hover:text-[#D4A574]'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#D4A574] transition-all duration-300 ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
            {isAuthenticated && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="text-sm font-medium text-[#4A7C59] hover:text-[#D4A574] transition-colors"
                >
                  Admin
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
                >
                  Sair
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-[#D4A574] transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-[#D4A574]/20"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 text-sm font-medium transition-colors ${
                    isActive(link.path) ? 'text-[#D4A574]' : 'text-white hover:text-[#D4A574]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated && (
                <>
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block py-2 text-sm font-medium text-[#4A7C59] hover:text-[#D4A574] transition-colors"
                  >
                    Admin
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="block py-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors w-full text-left"
                  >
                    Sair
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;