import { Github, ExternalLink, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import WeatherDashboard from '@/components/WeatherDashboard';

import uniStoreImg from '../assets/images/sessionProjects/unistore.png';
import crudNestJsImg from '../assets/images/sessionProjects/crudnestjs.png';
import investmentCalculatorImg from '../assets/images/sessionProjects/investmentcalculator.png';
import financingCalculatorImg from '../assets/images/sessionProjects/financingcalculator.png';
import cpfGeneratorImg from '../assets/images/sessionProjects/cpfgenerator.png';
import passwordGeneratorImg from '../assets/images/sessionProjects/passwordgenerator.png';
import ecommerceRailsImg from '../assets/images/sessionProjects/ecomercerails.png';
import snakeGameImg from '../assets/images/sessionProjects/snakegame.png';
import survivorRpgImg from '../assets/images/sessionProjects/survivorrpg.png';
import weatherDashboardImg from '../assets/images/sessionProjects/weatherdashboard.png';
import cliniqueueImg from '../assets/images/sessionProjects/cliniqueue.png';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ProjectsProps {
  limit?: number;
  showWeatherComponent?: boolean;
}

const Projects: React.FC<ProjectsProps> = ({
  limit,
  showWeatherComponent = false,
}) => {
  const { t } = useTranslation();

  const rawProjects = [
    {
      title: 'CliniQueue',
      translationKey: 'cliniqueue',
      image: cliniqueueImg,
      technologies: [
        'Next.js',
        'TypeScript',
        'TailwindCSS',
        'Prisma',
        'PostgreSQL',
        'NextAuth.js',
        'Pusher',
      ],
      live: 'https://cliniqueue-seven.vercel.app/',
    },
    {
      title: 'Weather Dashboard',
      translationKey: 'weatherDashboard',
      image: weatherDashboardImg,
      technologies: [
        'React',
        'TypeScript',
        'TailwindCSS',
        'Axios',
        'OpenWeatherMap API',
        'Vite',
      ],
      github: 'https://github.com/jpmoreiradev/weather-dashboard',
      live: '/projects/weather-dashboard',
      showInIntro: false,
    },
    {
      title: 'Gerador de Senha',
      translationKey: 'passwordGenerator',
      image: passwordGeneratorImg,
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'Hooks', 'Vite'],
      github:
        'https://github.com/jpmoreiradev/portfolio/blob/main/src/components/projects/PasswordGenerator.tsx',
      live: '/projects/password-generator',
    },
    {
      title: 'Calculadora de Investimento',
      translationKey: 'investmentCalculator',
      image: investmentCalculatorImg,
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'Hooks', 'Vite'],
      github:
        'https://github.com/jpmoreiradev/portfolio/blob/main/src/components/projects/InvestmentCalculator.tsx',
      live: '/projects/investment-calculator',
    },
    {
      title: 'E-commerce com Ruby on Rails',
      translationKey: 'ecommerceRails',
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
      liveDisabled: true,
    },
    {
      title: 'Survivor RPG',
      translationKey: 'survivorRpg',
      image: survivorRpgImg,
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'Hooks', 'Vite'],
      github:
        'https://github.com/jpmoreiradev/portfolio/blob/main/src/components/projects/SurvivorRPG.tsx',
      live: '/projects/survivor-rpg',
    },
    {
      title: 'Calculadora de Financiamento',
      translationKey: 'financingCalculator',
      image: financingCalculatorImg,
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'Hooks', 'Vite'],
      github:
        'https://github.com/jpmoreiradev/portfolio/blob/main/src/components/projects/InvestmentCalculator.tsx',
      live: '/projects/financing-calculator',
    },
    {
      title: 'Gerador e Validador de CPF',
      translationKey: 'cpfGenerator',
      image: cpfGeneratorImg,
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'Hooks', 'Vite'],
      github:
        'https://github.com/jpmoreiradev/portfolio/blob/main/src/components/projects/CpfGenerator.tsx',
      live: '/projects/cpf-generator',
    },
    {
      title: 'Snake Game',
      translationKey: 'snakeGame',
      image: snakeGameImg,
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'Hooks', 'Vite'],
      github:
        'https://github.com/jpmoreiradev/portfolio/blob/main/src/components/projects/SnakeGame.tsx',
      live: '/projects/snake-game',
    },
    {
      title: 'NestJS CRUD API',
      translationKey: 'nestjsCrud',
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
      translationKey: 'unistore',
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
    },
  ];

  // Se mostrar o componente, remove do array. Se não mostrar o componente, mantém no array
  const allProjects = showWeatherComponent
    ? rawProjects.filter((project) => project.title !== 'Weather Dashboard')
    : rawProjects;

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
    'OpenWeatherMap API': 'https://openweathermap.org/api',
    'Next.js': 'https://nextjs.org/',
    'NextAuth.js': 'https://next-auth.js.org/',
    Pusher: 'https://pusher.com/',
  };

  return (
    <TooltipProvider>
      <section id="projetos" className="py-20 section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t('projects.title')}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
            </div>

            {/* Mostra o componente WeatherDashboard apenas se showWeatherComponent for true */}
            {showWeatherComponent && <WeatherDashboard />}

            <div className="space-y-16">
              {projectsToRender.map((project, index) => {
                const hasLive = !!project.live;
                const isCliniQueue = project.title === 'CliniQueue';
                const borderColor = isCliniQueue
                  ? 'border-[#6522B5]'
                  : 'border-green-500';

                const description = t(
                  `projects.items.${project.translationKey}.description`,
                );
                const detailedInfo = t(
                  `projects.items.${project.translationKey}.detailedInfo`,
                  { defaultValue: description },
                );

                return (
                  <div
                    key={index}
                    className={`grid md:grid-cols-2 gap-8 items-center animate-fade-in ${
                      index % 2 === 1 ? 'md:grid-flow-col-dense' : ''
                    } ${hasLive ? `border-2 ${borderColor} shadow-lg rounded-lg` : ''}`}
                  >
                    <div
                      className={`relative group ${
                        index % 2 === 1 ? 'md:col-start-2' : ''
                      }`}
                    >
                      {project.live ? (
                        <a
                          href={project.live}
                          {...(isCliniQueue && {
                            target: '_blank',
                            rel: 'noopener noreferrer',
                          })}
                        >
                          <div className="aspect-video rounded-lg overflow-hidden bg-card border border-border relative">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {hasLive && (
                              <span
                                className="absolute top-2 left-2 text-white text-xs font-semibold px-2 py-1 rounded"
                                style={{
                                  backgroundColor: isCliniQueue
                                    ? '#6522B5'
                                    : '#22c55e',
                                }}
                              >
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
                                {detailedInfo}
                                <p className="mt-4 text-sm text-primary font-semibold">
                                  {t('projects.dialog.notAvailable')}
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
                        <p className="text-muted-foreground">{description}</p>
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
                        {project.github ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg border border-border hover:border-primary text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110 relative"
                              >
                                <Github size={20} />
                              </a>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{t('projects.tooltips.github')}</p>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="p-2 rounded-lg border border-border text-muted-foreground/50 cursor-not-allowed relative">
                                <Github size={20} />
                                <Lock
                                  size={14}
                                  className="absolute top-1 left-1 bg-background rounded-full p-0.5"
                                />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Repositório privado por questão de segurança
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        )}

                        {(project.live || project.liveDisabled) && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              {project.liveDisabled ? (
                                <div className="p-2 rounded-lg border border-border text-muted-foreground/50 cursor-not-allowed">
                                  <ExternalLink size={20} />
                                </div>
                              ) : (
                                <a
                                  href={project.live}
                                  {...(isCliniQueue && {
                                    target: '_blank',
                                    rel: 'noopener noreferrer',
                                  })}
                                  className="p-2 rounded-lg border border-border hover:border-primary text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
                                >
                                  <ExternalLink size={20} />
                                </a>
                              )}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {project.liveDisabled
                                  ? 'Aplicação não hospedada'
                                  : t('projects.tooltips.live')}
                              </p>
                            </TooltipContent>
                          </Tooltip>
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
                    <span>{t('projects.viewAll')}</span>
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
    </TooltipProvider>
  );
};

export default Projects;
