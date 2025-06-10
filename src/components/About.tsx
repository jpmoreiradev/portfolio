import React from 'react';

const About = () => {
  const skills = [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Express',
    'PostgreSQL',
    'MongoDB',
    'Docker',
    'Jest',
    'Git',
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

          <div >
            <div className="space-y-6 animate-fade-in">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Olá! Meu nome é <span className="text-primary font-semibold">João Pedro</span> e tenho paixão por resolver problemas usando tecnologia. Meu foco principal está no desenvolvimento <span className="text-primary">Back-end</span>.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Desde 2020 venho me dedicando à construção de soluções digitais. Já trabalhei com <span className="text-primary">bancos de dados relacionais e não-relacionais</span>, desenvolvi <span className="text-primary">APIs otimizadas</span> usando Express e Node.js, e implementei testes automatizados com Jest e Mocha.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Tenho familiaridade com <span className="text-primary">Docker</span> para deploy de aplicações e sempre busco criar produtos de qualidade, com foco em <span className="text-primary">performance</span> e <span className="text-primary">acessibilidade</span>.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Aqui estão algumas tecnologias com as quais tenho trabalhado recentemente:
              </p>

              <div className="grid grid-cols-2 gap-2">
                {skills.map((skill, index) => (
                  <div
                    key={skill}
                    className="flex items-center space-x-2 text-muted-foreground"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-primary">▹</span>
                    <span className="text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="flex justify-center animate-fade-in">
              <div className="relative group">
                <div className="w-80 h-80 rounded-lg overflow-hidden border-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-300">
                  <img
                    src="/caminho/para/sua-foto.jpg"
                    alt="Foto do perfil"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-primary/20 rounded-lg group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
