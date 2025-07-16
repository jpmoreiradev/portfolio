import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { useEffect } from 'react';

const IndexPage = () => {
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
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects limit={3} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default IndexPage;
