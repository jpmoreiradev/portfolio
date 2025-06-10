
import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 section-padding border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-6">
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-border hover:border-primary text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-border hover:border-primary text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:seu@email.com"
              className="p-3 rounded-lg border border-border hover:border-primary text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
            >
              <Mail size={20} />
            </a>
          </div>
          
          <div className="space-y-2">
            <p className="text-muted-foreground flex items-center justify-center space-x-2">
              <span>Construído com</span>
              <Heart className="w-4 h-4 text-blue-500" />
              <span>por JPmoreira</span>
            </p>
            <p className="text-muted-foreground text-sm">
              © 2025 Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
