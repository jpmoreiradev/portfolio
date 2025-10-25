import { Github, ExternalLink } from 'lucide-react';

import uniStoreImg from '../assets/images/sessionProjects/unistore.png';
import crudNestJsImg from '../assets/images/sessionProjects/crudnestjs.png';
import investmentCalculatorImg from '../assets/images/sessionProjects/investmentcalculator.png';
import financingCalculatorImg from '../assets/images/sessionProjects/financingcalculator.png';
import cpfGeneratorImg from '../assets/images/sessionProjects/cpfgenerator.png';
import passwordGeneratorImg from '../assets/images/sessionProjects/passwordgenerator.png';
import ecommerceRailsImg from '../assets/images/sessionProjects/ecomercerails.png';
import snakeGameImg from '../assets/images/sessionProjects/snakegame.png';
import survivorRpgImg from '../assets/images/sessionProjects/survivorrpg.png';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ProjectsProps {
  limit?: number;
}

const Projects: React.FC<ProjectsProps> = ({ limit }: { limit: number }) => {
  const allProjects = [
    {
      title: 'Gerador de Senha',
      description:
        'Uma ferramenta para gerar senhas seguras com opções personalizáveis de comprimento, inclusão de números, símbolos e letras maiúsculas.',
      image: passwordGeneratorImg,
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'Hooks', 'Vite'],
      github:
        'https://github.com/jpmoreiradev/portfolio/blob/main/src/components/projects/PasswordGenerator.tsx',
      live: '/projects/password-generator',
    },
    {
      title: 'Survivor RPG',
      description:
        'Um jogo de RPG de sobrevivência em texto. O jogador precisa tomar decisões para sobreviver em um mundo pós-apocalíptico.',
      image: survivorRpgImg,
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'Hooks', 'Vite'],
      github:
        'https://github.com/jpmoreiradev/portfolio/blob/main/src/components/projects/SurvivorRPG.tsx',
      live: '/projects/survivor-rpg',
    },
    {
      title: 'Gerador e Validador de CPF',
      description:
        'Uma ferramenta para gerar e validar CPFs. Ideal para desenvolvedores e testadores que precisam de números de CPF válidos para seus projetos.',
      image: cpfGeneratorImg,
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'Hooks', 'Vite'],
      github:
        'https://github.com/jpmoreiradev/portfolio/blob/main/src/components/projects/CpfGenerator.tsx',
      live: '/projects/cpf-generator',
    },
    {
      title: 'Calculadora de Investimento',
      description:
        'Uma calculadora interativa que simula investimentos com aportes mensais, taxa de juros composta e desconto de imposto de renda. Desenvolvida com React.',
      image: investmentCalculatorImg,
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'Hooks', 'Vite'],
      github:
        'https://github.com/jpmoreiradev/portfolio/blob/main/src/components/projects/InvestmentCalculator.tsx',
      live: '/projects/investment-calculator',
    },
    {
      title: 'E-commerce com Ruby on Rails',
      description:
        'Uma plataforma de e-commerce completa desenvolvida com Ruby on Rails, com funcionalidades de carrinho de compras, gerenciamento de produtos, e integração de pagamentos.',
      image: ecommerceRailsImg,
      technologies: [
        'Ruby on Rails',
        'PostgreSQL',
        'TailwindCSS',
        'Stripe',
        'RSpec',
        'Capybara',
      ],
      github: 'https://github.com/jpmoreiradev/rails-ecommerce',
      detailedInfo:
        'Este é um projeto de e-commerce full-stack construído com Ruby on Rails. Ele inclui um painel de administração para gerenciar produtos, pedidos e usuários. A integração com o Stripe permite pagamentos seguros com cartão de crédito. O projeto foi testado extensivamente com RSpec e Capybara para garantir a qualidade do código.',
    },
    {
      title: 'Calculadora de Financiamento',
      description:
        'Uma calculadora interativa que simula financiamentos com base em valor total, entrada, taxa de juros e prazo. Exibe parcelas mensais, total pago, juros e tabela de amortização. Desenvolvida com React',
      image: financingCalculatorImg,
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'Hooks', 'Vite'],
      github:
        'https://github.com/jpmoreiradev/portfolio/blob/main/src/components/projects/InvestmentCalculator.tsx',
      live: '/projects/financing-calculator',
    },
    {
      title: 'Snake Game',
      description:
        'Um jogo clássico da cobrinha desenvolvido com React e TypeScript. O objetivo é comer o máximo de frutas possível sem bater nas paredes ou em si mesmo.',
      image: snakeGameImg,
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'Hooks', 'Vite'],
      github:
        'https://github.com/jpmoreiradev/portfolio/blob/main/src/components/projects/SnakeGame.tsx',
      live: '/projects/snake-game',
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
      detailedInfo:
        'Uma API RESTful robusta construída com NestJS, seguindo as melhores práticas de arquitetura de software. Utiliza o Prisma como ORM para interagir com o banco de dados PostgreSQL. A autenticação é feita com JWT e as senhas são armazenadas de forma segura usando bcrypt. O projeto é totalmente configurado com ESLint e Prettier para manter a qualidade e a consistência do código.',
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
      detailedInfo:
        'Uma plataforma de e-commerce que consome a API do Mercado Livre para buscar produtos, exibir detalhes e permitir que os usuários façam compras. O backend foi construído com Node.js e Express, e o Sequelize foi usado como ORM. A autenticação de usuário é implementada com JWT.',
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
    'Ruby on Rails': 'https://rubyonrails.org/',
    Stripe: 'https://stripe.com/',
    RSpec: 'https://rspec.info/',
    Capybara: 'https://teamcapybara.github.io/capybara/',
    PostgreSQL: 'https://www.postgresql.org/',
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
                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
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
                      </a>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="aspect-video rounded-lg overflow-hidden bg-card border border-border relative cursor-pointer">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-primary/20 rounded-lg group-hover:bg-transparent transition-colors duration-300"></div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>{project.title}</DialogTitle>
                            <DialogDescription>
                              {project.detailedInfo || project.description}
                              <p className="mt-4 text-sm text-primary font-semibold">
                                Este projeto ainda não está disponível online,
                                mas você pode ver o código-fonte no GitHub.
                              </p>
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="sm:justify-start">
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg border border-border hover:border-primary text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
                            >
                              <Github size={20} />
                            </a>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>

                  {/* Conteúdo */}
                  <div
                    className={`space-y-4 ${
                      index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''
                    }`}
                  >
                    <div>
                      <h3 className="text-center text-2xl font-bold text-foreground">
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
