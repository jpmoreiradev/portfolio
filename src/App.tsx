import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import Blog from './pages/Blog';
import IndexPage from './pages/Index';
import NotFound from './pages/NotFound';
import FinancingCalculatorPage from './pages/FinancingCalculator';
import InvestmentCalculatorPage from './pages/InvestmentCalculator';
import ProjectsPage from './pages/Projects';
import SnakeGamePage from './pages/SnakeGame';
import SurvivorRPGPage from './pages/SurvivorRPG';
import CpfGeneratorPage from './pages/CpfGenerator';
import PasswordGeneratorPage from './pages/PasswordGenerator';
import WeatherDashboardPage from './pages/WeatherDashboard';

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/blogs" element={<Blog />} />
            <Route
              path="/projects/investment-calculator"
              element={<InvestmentCalculatorPage />}
            />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route
              path="/projects/financing-calculator"
              element={<FinancingCalculatorPage />}
            />
            <Route path="/projects/snake-game" element={<SnakeGamePage />} />
            <Route
              path="/projects/survivor-rpg"
              element={<SurvivorRPGPage />}
            />
            <Route
              path="/projects/cpf-generator"
              element={<CpfGeneratorPage />}
            />
            <Route
              path="/projects/password-generator"
              element={<PasswordGeneratorPage />}
            />
            <Route
              path="/projects/weather-dashboard"
              element={<WeatherDashboardPage />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
