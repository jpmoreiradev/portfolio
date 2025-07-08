import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

import uniStoreImg from '../assets/images/sessionProjects/unistore.png';
import crudNestJsImg from '../assets/images/sessionProjects/crudnestjs.png';
import investmentCalculatorImg from '../assets/images/sessionProjects/investmentcalculator.png';


const Projects = () => {
  const projects = [
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
    {
    title: 'Calculadora de Investimento',
    description:
      'Uma calculadora interativa que simula investimentos com aportes mensais, taxa de juros composta e desconto de imposto de renda. Desenvolvida com React e Tailwind CSS.',
    image: investmentCalculatorImg,
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Hooks',
      'Vite',
    ],
    github: 'https://github.com/jpmoreiradev/investment-calculator', // substitua pela URL real se necessário
    live: 'https://jpmoreiradev.com.br/projects/investment-calculator'
  },
  ];

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
            {projects.map((project, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-8 items-center animate-fade-in ${
                  index % 2 === 1 ? 'md:grid-flow-col-dense' : ''
                }`}
              >
                {/* Imagem */}
                <div
                  className={`relative group ${
                    index % 2 === 1 ? 'md:col-start-2' : ''
                  }`}
                >
                  <div className="aspect-video rounded-lg overflow-hidden bg-card border border-border">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
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
                    <p className="text-primary text-sm font-medium">Projeto em Destaque</p>
                    <h3 className="text-2xl font-bold text-foreground">
                      {project.title}
                    </h3>
                  </div>

                  <div className="bg-card p-6 rounded-lg border border-border">
                    <p className="text-muted-foreground">{project.description}</p>
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
