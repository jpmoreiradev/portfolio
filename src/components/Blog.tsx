import React from 'react';

type Post = {
  id: number;
  title: string;
  summary: string;
  date: string;
  emoji: string;
};

const posts: Post[] = [
  {
    id: 14,
    title: 'Adicionei destaque para projetos com versão live no portfólio',
    summary: 'Implementei um destaque visual para os projetos que possuem link live, adicionando borda colorida, sombra e selo "LIVE" na imagem. Isso facilita a identificação dos projetos interativos e melhora a experiência dos visitantes.',
    date: '08 de Julho de 2025',
    emoji: '✨',
  },
  {
    id: 13,
    title: 'Adicionei a Calculadora de Investimento interativa ao portfólio',
    summary: 'Desenvolvi uma calculadora de investimento usando React e Tailwind CSS, que simula aportes mensais, taxa de juros compostos e desconta imposto de renda. Inclui tabela detalhada de rendimentos e saldo ao longo do tempo.',
    date: '07 de Julho de 2025',
    emoji: '📈',
  },
  {
    id: 12,
    title: 'Adicionei um projeto de CRUD NestJS no portfólio e adicionei melhorias no mesmo',
    summary: 'Adicionei o projeto CRUD com NestJS e Prisma no portfólio, incluindo detalhes sobre a criptografia de senhas com bcrypt. Fiz ajustes nos textos, corrigi erros de tipagem e ESLint, além de pequenas melhorias visuais e na organização do código.',
    date: '05 de Julho de 2025',
    emoji: '🛠️',
  },
  {
    id: 11,
    title: 'Finalizando detalhes e testes',
    summary: 'Revisei o portfólio completo, corrigi bugs, testei responsividade em vários dispositivos e preparei para o deploy final.',
    date: '25 de Junho de 2025',
    emoji: '✅',
  },
  
  {
    id: 10,
    title: 'Implementando animações suaves',
    summary: 'Usei a biblioteca Framer Motion para adicionar transições e animações que deixam a navegação mais fluida e agradável.',
    date: '25 de Junho de 2025',
    emoji: '✨',
  },
  {
    id: 9,
    title: 'Criando sistema de navegação com React Router',
    summary: 'Implementei rotas para seções Home, Experiência, Projetos e Contato usando React Router, para navegação rápida sem recarregar a página.',
    date: '25 de Junho de 2025',
    emoji: '🔀',
  },
   {
    id: 8,
    title: 'Configurando deploy automático',
    summary: 'Configurei o GitHub Actions para deploy automático no Vercel sempre que faço push no repositório. Automatizando o fluxo.',
    date: '23 de Junho de 2025',
    emoji: '🤖',
  },
  {
    id: 7,
    title: 'Adicionei uma pagina de blogs',
    summary: 'Resolvi adicionar uma pagina de blogs, não pretendo perde muito tempo nisso a ideia inicial e deixa vocês atualizados nos projetos que estou trabalhando.',
    date: '22 de Junho de 2025',
    emoji: '📂',
  },
  {
    id: 6,
    title: 'Construindo a seção de projetos',
    summary: 'Desenvolvi cards dinâmicos para listar meus projetos com links e descrições, usando props para deixar o componente reutilizável.',
    date: '22 de Junho de 2025',
    emoji: '📂',
  },
  {
    id: 5,
    title: 'Estilizando com Tailwind CSS',
    summary: 'Optei pelo Tailwind CSS porque tenho mais conhecimento e estava com pressa. Pretendo mudar no futuro.',
    date: '22 de Junho de 2025',
    emoji: '🎨',
  },
  {
    id: 4,
    title: 'Configurando o ambiente com Vite e React',
    summary: 'Iniciei o projeto com Vite para ter um build rápido e eficiente, usando React para a interface e estruturação dos componentes.',
    date: '16 de Junho de 2025',
    emoji: '⚙️',
  },
  {
    id: 3,
    title: 'Planejando o layout e funcionalidades',
    summary: 'Pesquisei referências, esbocei wireframes e decidi as seções do portfólio: Sobre, Projetos e Contato.',
    date: '11 de Junho de 2025',
    emoji: '📝',
  },
  {
    id: 1,
    title: 'Começando o projeto',
    summary: 'Criei o repositório no GitHub e configurei o ambiente inicial para começar o desenvolvimento do portfólio.',
    date: '10 de Junho de 2025',
    emoji: '🚀',
  },
  {
    id: 2,
    title: 'Definindo objetivos e tecnologias',
    summary: 'Escolhi React, Tailwind e Vite como base do projeto, com foco em performance, escalabilidade e facilidade de manutenção.',
    date: '10 de Junho de 2025',
    emoji: '🎯',
  },
 
];


// Agrupar por data
const groupPostsByDate = (posts: Post[]): Record<string, Post[]> => {
  return posts.reduce((acc, post) => {
    if (!acc[post.date]) {
      acc[post.date] = [];
    }
    acc[post.date].push(post);
    return acc;
  }, {} as Record<string, Post[]>);
};

const Blogs: React.FC = () => {
  const groupedPosts = groupPostsByDate(posts);

  return (
    <main className="section-padding pt-20">
      <h1 className="text-3xl font-bold mb-6">Log de Desenvolvimento</h1>
      <div className="space-y-10">
        {Object.entries(groupedPosts).map(([date, postsOnDate]) => {
          const emoji = postsOnDate[0]?.emoji || '';
          return (
            <section key={date}>
              <h2 className="text-lg font-semibold text-muted-foreground mb-4">
                <span className="ml-2">{emoji}</span> {date} 
              </h2>
              <div className="space-y-6">
                {postsOnDate.map((post) => (
                  <article
                    key={post.id}
                    className="border p-4 rounded-xl shadow-sm hover:shadow-md transition bg-background"
                  >
                    <h3 className="text-xl font-semibold text-primary mb-2">{post.title}</h3>
                    <p className="text-base text-foreground">{post.summary}</p>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
};

export default Blogs;
