import Footer from '@/components/Footer';
import Header from '@/components/Header';
import CpfGenerator from '@/components/projects/CpfGenerator';

const CpfGeneratorPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <CpfGenerator />
      </main>
      <Footer />
    </div>
  );
};

export default CpfGeneratorPage;
