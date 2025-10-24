import Header from '../components/Header';
import InvestmentCalculator from '../components/projects/InvestmentCalculator.tsx';
import Footer from '../components/Footer';

const InvestmentCalculatorPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex justify-center items-center pt-10 p-4">
        <InvestmentCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default InvestmentCalculatorPage;
