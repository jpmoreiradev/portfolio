import Header from '../components/Header';
import SnakeGame from '../components/projects/SnakeGame';
import Footer from '../components/Footer';

const SnakeGamePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SnakeGame />
      </main>
      <Footer />
    </div>
  );
};

export default SnakeGamePage;
