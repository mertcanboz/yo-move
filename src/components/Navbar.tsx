
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Facebook, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <NavLink 
      to={to}
      className={({ isActive }) => 
        cn("relative px-3 py-2 hover:text-yoga-primary transition-colors duration-300", {
          "text-yoga-primary font-medium": isActive,
          "text-yoga-dark": !isActive
        })
      }
      onClick={closeMenu}
    >
      {children}
    </NavLink>
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold font-heading text-yoga-primary">YO! MOVE</span>
          </NavLink>
          
          {/* Social Media Icons */}
          <div className="flex items-center ml-4 space-x-2">
            <a 
              href="https://www.facebook.com/profile.php?id=100087722141054" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-yoga-dark hover:text-yoga-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="https://www.instagram.com/yomofitness" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-yoga-dark hover:text-yoga-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <LanguageSelector />
          <div className="ml-4">
            <NavItem to="/">{t('nav.home')}</NavItem>
            <NavItem to="/qualifications">{t('nav.qualifications')}</NavItem>
            <NavItem to="/english">English</NavItem>
            <NavItem to="/contact">{t('nav.contact')}</NavItem>
            <Button variant="outline" className="ml-4" onClick={() => {}}>{t('nav.login')}</Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-yoga-dark hover:text-yoga-primary"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col py-4 px-4 space-y-4">
            <div className="self-start">
              <LanguageSelector />
            </div>
            <NavItem to="/">{t('nav.home')}</NavItem>
            <NavItem to="/qualifications">{t('nav.qualifications')}</NavItem>
            <NavItem to="/english">English</NavItem>
            <NavItem to="/contact">{t('nav.contact')}</NavItem>
            <Button variant="outline" className="mt-2" onClick={() => {}}>{t('nav.login')}</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
