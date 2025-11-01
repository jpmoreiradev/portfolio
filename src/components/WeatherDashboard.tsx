import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Search,
  Cloud,
  Wind,
  Droplets,
  Gauge,
  MapPin,
  Star,
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import axios from 'axios';

interface WeatherData {
  name: string;
  country: string;
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  weather_code: number;
  description: string;
  wind_speed: number;
  latitude: number;
  longitude: number;
}

interface ForecastData {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    weather_code: number[];
  };
}

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteCities');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchWeather('Banabuiú');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Weather code to description mapping (WMO Weather interpretation codes)
  const getWeatherDescription = (code: number): string => {
    const weatherCodes: { [key: number]: string } = {
      0: 'Céu limpo',
      1: 'Principalmente limpo',
      2: 'Parcialmente nublado',
      3: 'Nublado',
      45: 'Névoa',
      48: 'Névoa com geada',
      51: 'Garoa leve',
      53: 'Garoa moderada',
      55: 'Garoa intensa',
      61: 'Chuva leve',
      63: 'Chuva moderada',
      65: 'Chuva intensa',
      71: 'Neve leve',
      73: 'Neve moderada',
      75: 'Neve intensa',
      80: 'Pancadas de chuva leve',
      81: 'Pancadas de chuva moderada',
      82: 'Pancadas de chuva intensa',
      95: 'Tempestade',
      96: 'Tempestade com granizo leve',
      99: 'Tempestade com granizo intenso',
    };
    return weatherCodes[code] || 'Desconhecido';
  };

  // Get geocoding data for city name
  const getGeocodingData = async (cityName: string) => {
    const response = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=pt&format=json`,
    );
    return response.data;
  };

  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) {
      toast.error('Por favor, digite o nome de uma cidade');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Get geocoding data (latitude, longitude)
      const geoData = await getGeocodingData(cityName);

      if (!geoData.results || geoData.results.length === 0) {
        toast.error('Cidade não encontrada. Tente novamente.');
        setWeatherData(null);
        setForecastData(null);
        setLoading(false);
        return;
      }

      const location = geoData.results[0];
      const { latitude, longitude, name, country } = location;

      // Step 2: Fetch current weather and forecast from Open-Meteo (FREE!)
      const weatherResponse = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max&timezone=auto&forecast_days=7`,
      );

      const current = weatherResponse.data.current;
      const daily = weatherResponse.data.daily;

      // Transform data to our format
      const transformedWeatherData: WeatherData = {
        name: name,
        country: country,
        temp: Math.round(current.temperature_2m),
        feels_like: Math.round(current.apparent_temperature),
        humidity: current.relative_humidity_2m,
        pressure: current.surface_pressure,
        weather_code: current.weather_code,
        description: getWeatherDescription(current.weather_code),
        wind_speed: current.wind_speed_10m,
        latitude,
        longitude,
      };

      const transformedForecastData: ForecastData = {
        daily: {
          time: daily.time,
          temperature_2m_max: daily.temperature_2m_max,
          weather_code: daily.weather_code,
        },
      };

      setWeatherData(transformedWeatherData);
      setForecastData(transformedForecastData);

      toast.success(`Dados de ${name} carregados com sucesso!`);
    } catch (error: unknown) {
      console.error('Error fetching weather:', error);
      toast.error('Erro ao buscar dados. Tente novamente.');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const toggleFavorite = (cityName: string) => {
    let updatedFavorites: string[];
    if (favorites.includes(cityName)) {
      updatedFavorites = favorites.filter((fav) => fav !== cityName);
      toast.info(`${cityName} removida dos favoritos`);
    } else {
      updatedFavorites = [...favorites, cityName];
      toast.success(`${cityName} adicionada aos favoritos`);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
  };

  const getWeatherIcon = (weatherCode: number): string => {
    // Map WMO weather codes to emoji icons
    if (weatherCode === 0) return '☀️';
    if (weatherCode === 1) return '🌤️';
    if (weatherCode === 2) return '⛅';
    if (weatherCode === 3) return '☁️';
    if (weatherCode === 45 || weatherCode === 48) return '🌫️';
    if (weatherCode >= 51 && weatherCode <= 55) return '🌦️';
    if (weatherCode >= 61 && weatherCode <= 65) return '🌧️';
    if (weatherCode >= 71 && weatherCode <= 75) return '❄️';
    if (weatherCode >= 80 && weatherCode <= 82) return '🌧️';
    if (weatherCode >= 95 && weatherCode <= 99) return '⛈️';
    return '🌡️';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-3xl flex items-center justify-center gap-2">
            <Cloud className="h-8 w-8 text-primary" />
            Weather Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Digite o nome da cidade..."
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              <Search className="h-4 w-4 mr-2" />
              {loading ? 'Buscando...' : 'Buscar'}
            </Button>
          </form>

          {/* Favorite Cities */}
          {favorites.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Favoritos:</span>
              {favorites.map((fav) => (
                <Button
                  key={fav}
                  variant="outline"
                  size="sm"
                  onClick={() => fetchWeather(fav)}
                  className="text-xs"
                >
                  {fav}
                </Button>
              ))}
            </div>
          )}

          {/* Current Weather */}
          {weatherData && (
            <div className="space-y-4">
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h2 className="text-2xl font-bold">
                        {weatherData.name}, {weatherData.country}
                      </h2>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(weatherData.name)}
                    >
                      <Star
                        className={`h-5 w-5 ${
                          favorites.includes(weatherData.name)
                            ? 'fill-yellow-500 text-yellow-500'
                            : ''
                        }`}
                      />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-5xl font-bold">
                        {weatherData.temp}°C
                      </div>
                      <p className="text-muted-foreground capitalize">
                        {weatherData.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Sensação térmica: {weatherData.feels_like}°C
                      </p>
                    </div>
                    <div className="text-8xl">
                      {getWeatherIcon(weatherData.weather_code)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weather Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-blue-500/10">
                        <Droplets className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Umidade</p>
                        <p className="text-2xl font-bold">
                          {weatherData.humidity}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-green-500/10">
                        <Wind className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Vento</p>
                        <p className="text-2xl font-bold">
                          {Math.round(weatherData.wind_speed)} km/h
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-orange-500/10">
                        <Gauge className="h-6 w-6 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Pressão</p>
                        <p className="text-2xl font-bold">
                          {Math.round(weatherData.pressure)} hPa
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 5-Day Forecast */}
              {forecastData && (
                <Card>
                  <CardHeader>
                    <CardTitle>Previsão para os próximos dias</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {forecastData.daily.time
                        .slice(1, 6)
                        .map((date, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center p-4 rounded-lg bg-muted"
                          >
                            <p className="text-sm font-medium">
                              {formatDate(date)}
                            </p>
                            <div className="text-4xl my-2">
                              {getWeatherIcon(
                                forecastData.daily.weather_code[index + 1],
                              )}
                            </div>
                            <p className="text-lg font-bold">
                              {Math.round(
                                forecastData.daily.temperature_2m_max[index + 1],
                              )}
                              °C
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {getWeatherDescription(
                                forecastData.daily.weather_code[index + 1],
                              )}
                            </p>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Initial State */}
          {!weatherData && !loading && (
            <div className="text-center py-12">
              <Cloud className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Digite o nome de uma cidade para ver a previsão do tempo
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Note */}
      <Card className="bg-green-500/10 border-green-500/20">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong>✓ 100% Grátis!</strong> Os dados meteorológicos são
            fornecidos pela{' '}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Open-Meteo API
            </a>{' '}
            Busque por qualquer cidade do mundo e adicione aos favoritos!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherDashboard;
