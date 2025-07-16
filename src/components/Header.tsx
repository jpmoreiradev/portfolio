import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface InterfaceHeader {
  href: string;
  label: string;
  onClick?: () => void;
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBlogPage, setIsBlogPage] = useState(false);
  const [isProjectsPage, setIsProjectsPage] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const currentPath = window.location.pathname;
    setIsBlogPage(currentPath === '/blogs');
    setIsProjectsPage(currentPath.startsWith('/projects'));
  }, []);

  const returnHome = [{ href: '/', label: 'Voltar' }];

  const returnProjects = [
    {
      href: '/',
      label: 'Voltar',
      onClick: () => sessionStorage.setItem('scrollTo', 'projetos'),
    },
  ];

  const homeHeader = [
    { href: '/#', label: 'Sobre' },
    { href: '#experiencia', label: 'Experiência' },
    { href: '#projetos', label: 'Projetos' },
    { href: '#contato', label: 'Contato' },
    { href: '/blogs', label: 'Blogs' },
  ];

  const navItems = isProjectsPage
    ? returnProjects
    : isBlogPage
      ? returnHome
      : homeHeader;

  const handleNavClick = (
    e: React.MouseEvent,
    href: string,
    onClick?: () => void,
  ) => {
    if (onClick) {
      onClick();
    }

    if (href.startsWith('#')) {
      e.preventDefault();
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-padding py-4">
        <div className="flex justify-between items-center">
          <a
            href="/"
            className="text-2xl font-bold text-gradient hover:scale-105 transition-transform duration-200"
          >
            jpmoreiradev.com.br
          </a>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item: InterfaceHeader) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.onClick)}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item: InterfaceHeader) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.onClick)}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
