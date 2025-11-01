import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WeatherDashboard from '@/components/WeatherDashboard';

const WeatherDashboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-12 px-4 space-y-6 max-w-6xl mx-auto">
        <WeatherDashboard />

        {/* Info adicional */}
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Explore os dados meteorológicos de qualquer cidade do mundo!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WeatherDashboardPage;
