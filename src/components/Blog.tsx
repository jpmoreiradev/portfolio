type Post = {
  id: number;
  title: string;
  summary: string;
  date: string;
  emoji: string;
};

const posts: Post[] = [
  {
    id: 29,
    title: 'Sistema de Internacionalização e Novo Projeto CliniQueue',
    summary:
      'Implementei um sistema completo de tradução (i18n) na seção de projetos com suporte para PT-BR e EN. Adicionei o projeto CliniQueue com destaque visual personalizado (borda e badge roxos #6522B5). Criei tooltips interativos nos botões usando Radix UI. Traduzi todos os 11 projetos do portfólio incluindo descrições e informações detalhadas. A arquitetura utiliza react-i18next com fallback automático. Nota: A tradução em inglês dos posts do blog ainda não está funcionando e será implementada em breve.',
    date: '21 de Janeiro de 2025',
    emoji: '🌐',
  },
  {
    id: 28,
    title: 'Refatorando Código Legado: Um Desafio Necessário',
    summary:
      'Dediquei um tempo para refatorar um projeto antigo, aplicando princípios de Clean Code e Design Patterns. O resultado foi um código mais limpo, legível e de fácil manutenção.',
    date: '10 de Novembro de 2025',
    emoji: '♻️',
  },
  {
    id: 27,
    title: 'Aprofundando em Testes Unitários com Jest e React Testing Library',
    summary:
      'Intensifiquei meus estudos em testes unitários para React, utilizando Jest e React Testing Library. Aumentar a cobertura de testes traz mais segurança e qualidade para a aplicação.',
    date: '08 de Novembro de 2025',
    emoji: '🧪',
  },
  {
    id: 26,
    title: 'Criando um Componente de UI Reutilizável: Modal',
    summary:
      'Desenvolvi um componente de modal genérico e reutilizável em React, com opções de personalização e acessibilidade. Um ótimo exercício de componentização.',
    date: '05 de Novembro de 2025',
    emoji: '🧩',
  },
  {
    id: 25,
    title: 'Otimizando a Performance de uma Aplicação React',
    summary:
      'Apliquei técnicas de otimização de performance em um projeto React, como code splitting, lazy loading e memoization. A velocidade de carregamento melhorou significativamente.',
    date: '03 de Novembro de 2025',
    emoji: '⚡️',
  },
  {
    id: 24,
    title: 'Estudando Design Patterns: Singleton e Factory',
    summary:
      'Iniciei um estudo sobre Design Patterns, começando pelos padrões Singleton e Factory. Entender esses conceitos é fundamental para escrever um código mais robusto e escalável.',
    date: '01 de Novembro de 2025',
    emoji: '📚',
  },
  {
    id: 23,
    title: 'Adicionando Autenticação com JWT em uma API Node.js',
    summary:
      'Implementei um sistema de autenticação baseado em JSON Web Tokens (JWT) em uma API Node.js/Express. Uma etapa crucial para a segurança de qualquer aplicação.',
    date: '30 de Outubro de 2025',
    emoji: '🔐',
  },
  {
    id: 22,
    title: 'Explorando o Ecossistema do Next.js',
    summary:
      'Comecei a estudar Next.js para desenvolver aplicações React com renderização no lado do servidor (SSR) e geração de sites estáticos (SSG).',
    date: '28 de Outubro de 2025',
    emoji: '🚀',
  },
  {
    id: 21,
    title: 'Gerenciamento de Estado com Redux Toolkit',
    summary:
      'Migrei o gerenciamento de estado de um projeto de `useState` para Redux Toolkit. A previsibilidade e a organização do estado global da aplicação melhoraram muito.',
    date: '27 de Outubro de 2025',
    emoji: '🔄',
  },
  {
    id: 17,
    title:
      'Princípios de Clean Code: Escrevendo Código Legível e de Fácil Manutenção',
    summary:
      'Dediquei um tempo para estudar e aplicar os princípios do Clean Code de Robert C. Martin. A diferença na qualidade e legibilidade do código é notável.',
    date: '24 de Outubro de 2025',
    emoji: '🧼',
  },
  {
    id: 16,
    title: 'Novos projetos: E-commerce com Rails e Web Scraping',
    summary:
      'Estudei Ruby on Rails e desenvolvi meu primeiro projeto, um e-commerce completo com painel de administrador para gerenciar produtos e sistema de pagamento. Além disso, criei um projeto de web scraping para extrair dados da web.',
    date: '15 de Setembro de 2025',
    emoji: '👨‍💻',
  },
  {
    id: 15,
    title: 'Melhorias na Usabilidade e Acessibilidade',
    summary:
      'Fiz uma revisão completa do portfólio, focando em melhorias de usabilidade e acessibilidade. Ajustei contrastes de cores, adicionei atributos ARIA e otimizei a navegação pelo teclado.',
    date: '20 de Agosto de 2025',
    emoji: '♿',
  },
  {
    id: 14,
    title: 'Criei a Calculadora de Financiamento',
    summary:
      'Desenvolvi uma calculadora de financiamento para simular empréstimos. O usuário pode inserir o valor, a taxa de juros e o prazo para ver o valor das parcelas e o total pago.',
    date: '15 de Julho de 2025',
    emoji: '💸',
  },
  {
    id: 13,
    title: 'Adicionei a Calculadora de Investimento interativa ao portfólio',
    summary:
      'Desenvolvi uma calculadora de investimento usando React e Tailwind CSS, que simula aportes mensais, taxa de juros compostos e desconta imposto de renda. Inclui tabela detalhada de rendimentos e saldo ao longo do tempo.',
    date: '07 de Julho de 2025',
    emoji: '📈',
  },
  {
    id: 12,
    title:
      'Adicionei um projeto de CRUD NestJS no portfólio e adicionei melhorias no mesmo',
    summary:
      'Adicionei o projeto CRUD com NestJS e Prisma no portfólio, incluindo detalhes sobre a criptografia de senhas com bcrypt. Fiz ajustes nos textos, corrigi erros de tipagem e ESLint, além de pequenas melhorias visuais e na organização do código.',
    date: '05 de Julho de 2025',
    emoji: '🛠️',
  },
  {
    id: 11,
    title: 'Finalizando detalhes e testes',
    summary:
      'Revisei o portfólio completo, corrigi bugs, testei responsividade em vários dispositivos e preparei para o deploy final.',
    date: '25 de Junho de 2025',
    emoji: '✅',
  },

  {
    id: 10,
    title: 'Implementando animações suaves',
    summary:
      'Usei a biblioteca Framer Motion para adicionar transições e animações que deixam a navegação mais fluida e agradável.',
    date: '25 de Junho de 2025',
    emoji: '✨',
  },
  {
    id: 9,
    title: 'Criando sistema de navegação com React Router',
    summary:
      'Implementei rotas para seções Home, Experiência, Projetos e Contato usando React Router, para navegação rápida sem recarregar a página.',
    date: '25 de Junho de 2025',
    emoji: '🔀',
  },
  {
    id: 8,
    title: 'Configurando deploy automático',
    summary:
      'Configurei o GitHub Actions para deploy automático no Vercel sempre que faço push no repositório. Automatizando o fluxo.',
    date: '23 de Junho de 2025',
    emoji: '🤖',
  },
  {
    id: 7,
    title: 'Adicionei uma pagina de blogs',
    summary:
      'Resolvi adicionar uma pagina de blogs, não pretendo perde muito tempo nisso a ideia inicial e deixa vocês atualizados nos projetos que estou trabalhando.',
    date: '22 de Junho de 2025',
    emoji: '📂',
  },
  {
    id: 6,
    title: 'Construindo a seção de projetos',
    summary:
      'Desenvolvi cards dinâmicos para listar meus projetos com links e descrições, usando props para deixar o componente reutilizável.',
    date: '22 de Junho de 2025',
    emoji: '📂',
  },
  {
    id: 5,
    title: 'Estilizando com Tailwind CSS',
    summary:
      'Optei pelo Tailwind CSS porque tenho mais conhecimento e estava com pressa. Pretendo mudar no futuro.',
    date: '22 de Junho de 2025',
    emoji: '🎨',
  },
  {
    id: 4,
    title: 'Configurando o ambiente com Vite e React',
    summary:
      'Iniciei o projeto com Vite para ter um build rápido e eficiente, usando React para a interface e estruturação dos componentes.',
    date: '16 de Junho de 2025',
    emoji: '⚙️',
  },
  {
    id: 3,
    title: 'Planejando o layout e funcionalidades',
    summary:
      'Pesquisei referências, esbocei wireframes e decidi as seções do portfólio: Sobre, Projetos e Contato.',
    date: '11 de Junho de 2025',
    emoji: '📝',
  },
  {
    id: 1,
    title: 'Começando o projeto',
    summary:
      'Criei o repositório no GitHub e configurei o ambiente inicial para começar o desenvolvimento do portfólio.',
    date: '10 de Junho de 2025',
    emoji: '🚀',
  },
  {
    id: 2,
    title: 'Definindo objetivos e tecnologias',
    summary:
      'Escolhi React, Tailwind e Vite como base do projeto, com foco em performance, escalabilidade e facilidade de manutenção.',
    date: '10 de Junho de 2025',
    emoji: '🎯',
  },
];

// Agrupar por data
const groupPostsByDate = (posts: Post[]): Record<string, Post[]> => {
  return posts.reduce(
    (acc, post) => {
      if (!acc[post.date]) {
        acc[post.date] = [];
      }
      acc[post.date].push(post);
      return acc;
    },
    {} as Record<string, Post[]>,
  );
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
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {post.title}
                    </h3>
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
