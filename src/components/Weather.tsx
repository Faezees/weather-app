"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Droplets,
  Loader2,
  MapPin,
  Sun,
  Sunrise,
  Sunset,
  Thermometer,
  Wind,
} from "lucide-react";
import { useState } from "react";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setWeather(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
      );
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (unix: number) => {
    return new Date(unix * 1000).toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col  min-h-screen items-center justify-center bg-gradient-to-br from-sky-400 to-blue-700 text-white px-4 py-10">
      <h1 className="text-4xl font-bold mb-8">🌤️ Weather App</h1>

      <div className="flex gap-2">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="p-3 rounded-lg text-black w-72 shadow-md focus:outline-none focus:ring-2 focus:ring-white/60"
        />
        <button
          onClick={fetchWeather}
          className="bg-white text-blue-600 px-5 py-3 rounded-lg hover:bg-gray-200 transition font-semibold shadow-md"
        >
          Get Weather
        </button>
      </div>

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 flex items-center gap-2 text-white"
        >
          <Loader2 className="animate-spin w-6 h-6" />
          <span className="text-lg">Loading weather...</span>
        </motion.div>
      )}

      <AnimatePresence>
        {weather?.main && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl mt-10 p-6 w-full max-w-md text-center shadow-lg space-y-4"
          >
            <div className="flex justify-center items-center gap-2 text-xl font-semibold">
              <MapPin className="w-5 h-5" />
              {weather.name}, {weather.sys.country}
            </div>

            <div>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt="weather icon"
                className="mx-auto"
              />
              <p className="capitalize text-lg">
                {weather.weather[0].description}
              </p>
              <p className="text-5xl font-bold">
                {Math.round(weather.main.temp)}°C
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-white/90">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4" />
                Feels like: {Math.round(weather.main.feels_like)}°C
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                Humidity: {weather.main.humidity}%
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4" />
                Wind: {weather.wind.speed} m/s
              </div>
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4" />
                Pressure: {weather.main.pressure} hPa
              </div>
              <div className="flex items-center gap-2">
                <Sunrise className="w-4 h-4" />
                Sunrise: {formatTime(weather.sys.sunrise)}
              </div>
              <div className="flex items-center gap-2">
                <Sunset className="w-4 h-4" />
                Sunset: {formatTime(weather.sys.sunset)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
