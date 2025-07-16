import { useEffect } from 'react';
import Header from '@/components/Header'; // ou ajuste o caminho se for diferente
import Hero from '@/components/Hero'; // seção principal
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    const sectionId = sessionStorage.getItem('scrollTo');
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100); 
      }
      sessionStorage.removeItem('scrollTo');
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects limit={3} />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Index;
