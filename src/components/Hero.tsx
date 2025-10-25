import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const phrases = [
  'Curto escrever código limpo e pensar em soluções que façam sentido.',
  'Tô sempre aprendendo algo novo e buscando melhorar a cada projeto.',
  'Gosto de ver uma ideia ganhando forma através do código e entregando valor real.',
  'Desenvolver algo do zero e ver funcionando é o que mais me motiva.',
  'Acredito que bons projetos nascem de colaboração e boas práticas.',
  'Tenho prazer em resolver problemas e deixar o código mais eficiente.',
  'Gosto de trabalhar em equipe e aprender com outras pessoas desenvolvedoras.',
  'Busco sempre entender o “porquê” por trás do que estou construindo.',
  'Me interesso por performance, boas arquiteturas e experiências bem feitas.',
  'Cada linha de código é uma chance de aprender e melhorar como dev.',
  'Gosto de ver o impacto real do que desenvolvo nas pessoas e empresas.',
  'Aprender novas tecnologias e aplicá-las na prática é o que me move.',
];

const Hero = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

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
          <p className="text-primary text-lg font-medium">Olá, meu nome é</p>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground">
            João Pedro
          </h1>
          <h2
            className="text-3xl md:text-5xl font-bold text-muted-foreground transition-opacity duration-500"
            style={{ opacity: opacity }}
          >
            {phrases[phraseIndex]}
          </h2>
        </div>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Sou um desenvolvedor com foco em{' '}
          <span className="text-primary font-semibold">
            aplicações completas
          </span>
          , atuando do{' '}
          <span className="text-primary font-semibold">backend</span> ao{' '}
          <span className="text-primary font-semibold">frontend</span>. Crio{' '}
          <span className="text-primary font-semibold">APIs</span>, gerencio{' '}
          <span className="text-primary font-semibold">
            bancos de dados SQL
          </span>{' '}
          e busco constantemente aprender, aprimorar meu código e explorar{' '}
          <span className="text-primary font-semibold">novas tecnologias</span>{' '}
          para entregar{' '}
          <span className="text-primary font-semibold">
            soluções eficientes
          </span>{' '}
          e práticas no dia a dia. Gosto de enfrentar{' '}
          <span className="text-primary font-semibold">desafios</span> e
          encontrar{' '}
          <span className="text-primary font-semibold">maneiras simples</span>{' '}
          de resolver problemas reais.
        </p>

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
            <span>Vamos começar</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
