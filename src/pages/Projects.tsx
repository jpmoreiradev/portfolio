import Header from '../components/Header';
import Projects from '../components/Projects';
import Footer from '../components/Footer';
import { Github } from 'lucide-react';

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Projects />
        <section className="py-20 text-center">
          <a
            href="https://github.com/jpmoreiradev?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700"
          >
            <Github size={20} />
            Ver mais projetos no GitHub
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
