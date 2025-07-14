import React from 'react';
import Header from '../components/Header.tsx';
import FinancingCalculator from '../components/projects/FinancingCalculator.tsx';

import Footer from '../components/Footer.tsx';

const FinancingCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
         <FinancingCalculator /> 
      </main>
      <Footer />
    </div>
  );
};

export default FinancingCalculatorPage;