import Header from '../components/Header';
import SurvivorRPG from '../components/projects/SurvivorRPG';
import Footer from '../components/Footer';

const SurvivorRPGPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SurvivorRPG />
      </main>
      <Footer />
    </div>
  );
};

export default SurvivorRPGPage;
