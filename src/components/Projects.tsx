
import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'UNISTORE E-commerce Platform',
      description: 'Neste projeto, foi desenvolvida uma loja online utilizando a API do Mercado Livre. A ideia era aproveitar as funcionalidades e o amplo catálogo de produtos disponíveis na plataforma para construir uma loja virtual própria.',
      image: 'https://private-user-images.githubusercontent.com/78699072/453610671-ba56a42b-7fff-4a85-bdcb-866e8d4c2023.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDk1ODE3NjQsIm5iZiI6MTc0OTU4MTQ2NCwicGF0aCI6Ii83ODY5OTA3Mi80NTM2MTA2NzEtYmE1NmE0MmItN2ZmZi00YTg1LWJkY2ItODY2ZThkNGMyMDIzLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA2MTAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNjEwVDE4NTEwNFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTU1OTI4NzBhNjRkODNkZWNhYmM1ZjkzNTZmZDZlMWM3ZjQ3MzkyOWJiOTIxZDdkZjRlZGM4ODAxZWZmN2EyNzkmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.W_WdDFrr7cWt46W1Uct8rpDd3gI0-u9jywpwy1-8vvk',
      technologies: [ "Axios", "Bcryptjs", "Crypto", "Dotenv", "Express", "Jsonwebtoken",  "Sequelize"],
      github: 'https://github.com/jpmoreiradev/unistore',
      // live: '',
    },
  ];

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
                {/* Image */}
                <div className={`relative group ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                  <div className="aspect-video rounded-lg overflow-hidden bg-card border border-border">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-primary/20 rounded-lg group-hover:bg-transparent transition-colors duration-300"></div>
                </div>

                {/* Content */}
                <div className={`space-y-4 ${index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                  <div>
                    <p className="text-primary text-sm font-medium">Projeto em Destaque</p>
                    <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
                  </div>

                  <div className="bg-card p-6 rounded-lg border border-border">
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full"
                      >
                        {tech}
                      </span>
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
                    
                    {/* <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-border hover:border-primary text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
                    >
                      <ExternalLink size={20} />
                    </a> */}
                    
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
