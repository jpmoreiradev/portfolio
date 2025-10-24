import Header from '../components/Header.tsx';
import FinancingCalculator from '../components/projects/FinancingCalculator.tsx';
import Footer from '../components/Footer.tsx';

const FinancingCalculatorPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex justify-center items-center pt-10 p-4">
        <FinancingCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default FinancingCalculatorPage;
