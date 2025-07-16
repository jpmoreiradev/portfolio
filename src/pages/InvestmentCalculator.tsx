import Header from '../components/Header';
import InvestmentCalculator from '../components/projects/InvestmentCalculator.tsx';
import Footer from '../components/Footer';

const InvestmentCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <InvestmentCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default InvestmentCalculatorPage;
