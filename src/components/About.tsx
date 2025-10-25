const About = () => {
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
              Sobre mim
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>

          <div>
            <div className="space-y-6 animate-fade-in">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Olá! Meu nome é{' '}
                <span className="text-primary font-semibold">João Pedro</span> e
                sou apaixonado por resolver problemas através da tecnologia.
                Gosto de aprender, construir e contribuir com projetos que façam
                a diferença.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Desde 2020 venho me dedicando à construção de soluções digitais,
                atuando como{' '}
                <span className="text-primary">desenvolvedor Back-end</span>. Já
                trabalhei com{' '}
                <span className="text-primary">
                  bancos de dados relacionais e não-relacionais
                </span>
                , desenvolvi{' '}
                <span className="text-primary">APIs otimizadas</span> usando
                Express e Node.js, e implementei testes automatizados com{' '}
                <span className="text-primary">Jest</span> e{' '}
                <span className="text-primary">Mocha</span>. Também tenho
                experiência com <span className="text-primary">Docker</span>{' '}
                para conteinerização de aplicações, versionamento com{' '}
                <span className="text-primary">Git</span>, e já participei de
                projetos que exigiram integração com serviços externos e boas
                práticas de segurança.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Sempre busco criar produtos de qualidade, com foco em{' '}
                <span className="text-primary">performance</span> e{' '}
                <span className="text-primary">acessibilidade</span>. Meu
                objetivo é entregar soluções que realmente agreguem valor,
                proporcionando uma experiência positiva para o usuário e
                facilidade de manutenção para as equipes de desenvolvimento.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Aqui estão algumas tecnologias com as quais tenho trabalhado
                recentemente:
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
