import { Github, ExternalLink } from 'lucide-react';

import uniStoreImg from '../assets/images/sessionProjects/unistore.png';
import crudNestJsImg from '../assets/images/sessionProjects/crudnestjs.png';
import investmentCalculatorImg from '../assets/images/sessionProjects/investmentcalculator.png';

interface ProjectsProps {
  limit?: number;
}

const Projects: React.FC<ProjectsProps> = ({ limit }: { limit: number }) => {
  const allProjects = [
    {
      title: 'Calculadora de Investimento',
      description:
        'Uma calculadora interativa que simula investimentos com aportes mensais, taxa de juros composta e desconto de imposto de renda. Desenvolvida com React e Tailwind CSS.',
      image: investmentCalculatorImg,
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'Hooks', 'Vite'],
      github:
        'https://github.com/jpmoreiradev/portfolio/blob/main/src/components/projects/InvestmentCalculator.tsx',
      live: '/projects/investment-calculator',
    },
    {
      title: 'NestJS CRUD API',
      description:
        'API CRUD com NestJS, Prisma e autenticação segura. Senhas criptografadas com bcrypt e arquitetura escalável com TypeScript.',
      image: crudNestJsImg,
      technologies: [
        'NestJS',
        'Prisma',
        'TypeScript',
        'PostgreSQL',
        'ESLint',
        'Prettier',
        'Bcryptjs',
      ],
      github: 'https://github.com/jpmoreiradev/nestjs-crud',
    },
    {
      title: 'UNISTORE E-commerce Platform',
      description:
        'Neste projeto, foi desenvolvida uma loja online utilizando a API do Mercado Livre. A ideia era aproveitar as funcionalidades e o amplo catálogo de produtos disponíveis na plataforma para construir uma loja virtual própria.',
      image: uniStoreImg,
      technologies: [
        'Axios',
        'Bcryptjs',
        'Crypto',
        'Dotenv',
        'Express',
        'Jsonwebtoken',
        'Sequelize',
      ],
      github: 'https://github.com/jpmoreiradev/unistore',
      // live: '',
    },
  ];

  const projectsToRender = limit ? allProjects.slice(0, limit) : allProjects;

  const techLinks: Record<string, string> = {
    Prettier: 'https://prettier.io/',
    ESLint: 'https://eslint.org/',
    TypeScript: 'https://www.typescriptlang.org/',
    Prisma: 'https://www.prisma.io/',
    NestJS: 'https://nestjs.com/',
    Axios: 'https://axios-http.com/',
    Bcryptjs: 'https://github.com/dcodeIO/bcrypt.js/',
    Crypto: 'https://nodejs.org/api/crypto.html',
    Dotenv: 'https://github.com/motdotla/dotenv',
    Express: 'https://expressjs.com/',
    Jsonwebtoken: 'https://github.com/auth0/node-jsonwebtoken',
    Sequelize: 'https://sequelize.org/',
    React: 'https://react.dev/',
    TailwindCSS: 'https://tailwindcss.com/',
    Hooks: 'https://react.dev/reference/react/hooks',
    Vite: 'https://vite.dev/',
  };

  return (
    <section id="projetos" className="py-20 section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Projetos em Destaque
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>

          <div className="space-y-16">
            {projectsToRender.map((project, index) => {
              const hasLive = !!project.live;

              return (
                <div
                  key={index}
                  className={`grid md:grid-cols-2 gap-8 items-center animate-fade-in ${
                    index % 2 === 1 ? 'md:grid-flow-col-dense' : ''
                  } ${hasLive ? 'border-2 border-green-500 shadow-lg rounded-lg' : ''}`}
                >
                  <div
                    className={`relative group ${
                      index % 2 === 1 ? 'md:col-start-2' : ''
                    }`}
                  >
                    <div className="aspect-video rounded-lg overflow-hidden bg-card border border-border relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {hasLive && (
                        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                          LIVE
                        </span>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-primary/20 rounded-lg group-hover:bg-transparent transition-colors duration-300"></div>
                  </div>

                  {/* Conteúdo */}
                  <div
                    className={`space-y-4 ${
                      index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''
                    }`}
                  >
                    <div>
                      <p className="text-primary text-sm font-medium">
                        Projeto em Destaque
                      </p>
                      <h3 className="text-2xl font-bold text-foreground">
                        {project.title}
                      </h3>
                    </div>

                    <div className="bg-card p-6 rounded-lg border border-border">
                      <p className="text-muted-foreground">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <a
                          key={tech}
                          href={techLinks[tech] || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full hover:underline"
                        >
                          {tech}
                        </a>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-border hover:border-primary text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
                      >
                        <Github size={20} />
                      </a>

                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg border border-border hover:border-primary text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {limit && (
              <div className="text-center">
                <a
                  href="/projects"
                  rel="noopener noreferrer"
                  className="text-center inline-flex items-center space-x-2 text-primary hover:text-secondary transition-colors duration-200 group"
                >
                  <span>Ver todos os projetos</span>
                  <ExternalLink
                    size={18}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
