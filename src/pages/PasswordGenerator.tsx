import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PasswordGenerator from '@/components/projects/PasswordGenerator';

const PasswordGeneratorPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <PasswordGenerator />
      </main>
      <Footer />
    </div>
  );
};

export default PasswordGeneratorPage;
