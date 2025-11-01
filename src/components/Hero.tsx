import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const phrases = t('hero.phrases', { returnObjects: true }) as string[];

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setOpacity(1);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center section-padding"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
        <div className="space-y-4">
          <p className="text-primary text-lg font-medium">
            {t('hero.greeting')}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground">
            {t('hero.name')}
          </h1>
          <h2
            className="text-3xl md:text-5xl font-bold text-muted-foreground transition-opacity duration-500"
            style={{ opacity: opacity }}
          >
            {phrases[phraseIndex]}
          </h2>
        </div>

        <p
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          dangerouslySetInnerHTML={{ __html: t('hero.description') }}
        />

        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/jpmoreiradev"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-border hover:border-primary text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/jo%C3%A3o-pedro-moreira-455b79203/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-border hover:border-primary text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="#contato"
            className="p-3 rounded-lg border border-border hover:border-primary text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
          >
            <Mail size={24} />
          </a>
          <a
            href="https://wa.me/5588997307495?text=Olá%2C%20gostaria%20de%20falar%20com%20você%20sobre%20o%20seu%20portfólio!"
            target="_blank"
            className="p-3 rounded-lg border border-border hover:border-primary text-muted-foreground hover.text-primary transition-all duration-200 hover:scale-110"
            rel="noreferrer"
          >
            <FaWhatsapp className="text-green-500 w-6 h-6" />
          </a>
        </div>

        <div className="pt-8">
          <a
            href="#sobre"
            className="inline-flex items-center space-x-2 text-primary hover:text-secondary transition-colors duration-200 group"
          >
            <span>{t('hero.cta')}</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
