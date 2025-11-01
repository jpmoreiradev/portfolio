import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  const mainSkills = [
    { name: 'Ruby on Rails', link: 'https://rubyonrails.org/' },
    { name: 'React', link: 'https://reactjs.org/' },
    { name: 'NestJS', link: 'https://nestjs.com/' },
    { name: 'Next.js', link: 'https://nextjs.org/' },
  ];

  const otherSkills = [
    { name: 'Node.js', link: 'https://nodejs.org/' },
    { name: 'Express', link: 'https://expressjs.com/' },
    { name: 'PostgreSQL', link: 'https://www.postgresql.org/' },
    { name: 'MongoDB', link: 'https://www.mongodb.com/' },
    { name: 'Docker', link: 'https://www.docker.com/' },
    { name: 'Jest', link: 'https://jestjs.io/' },
    {
      name: 'JavaScript',
      link: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript',
    },
    { name: 'TypeScript', link: 'https://www.typescriptlang.org/' },
    { name: 'Hotwire', link: 'https://hotwired.dev/' },
    { name: 'Stimulus', link: 'https://stimulus.hotwired.dev/' },
    { name: 'Turbo', link: 'https://turbo.hotwired.dev/' },
    { name: 'Tailwind CSS', link: 'https://tailwindcss.com/' },
    { name: 'Vite', link: 'https://vitejs.dev/' },
    { name: 'Openai-Api', link: 'https://openai.com/pt-BR/api/' },
  ];

  return (
    <section id="sobre" className="py-20 section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('about.title')}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>

          <div>
            <div className="space-y-6 animate-fade-in">
              <p
                className="text-muted-foreground text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('about.intro') }}
              />

              <p
                className="text-muted-foreground text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('about.experience') }}
              />

              <p
                className="text-muted-foreground text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('about.goal') }}
              />

              <p className="text-muted-foreground text-lg leading-relaxed">
                {t('about.techIntro')}
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {mainSkills.map((skill, index) => (
                    <a
                      key={skill.name}
                      href={skill.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 text-foreground bg-primary/10 hover:bg-primary/20 transition-colors duration-200 rounded-lg p-4"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="font-semibold">{skill.name}</span>
                    </a>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                  {otherSkills.map((skill, index) => (
                    <a
                      key={skill.name}
                      href={skill.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                      style={{
                        animationDelay: `${mainSkills.length * 0.1 + index * 0.05}s`,
                      }}
                    >
                      <span className="text-primary">▹</span>
                      <span className="text-sm hover:underline">
                        {skill.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
