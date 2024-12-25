import React, { useEffect, useRef, useState } from "react";
import clear from "../Assets/clear.png";
import cloud from "../Assets/cloud.png";
import drizzle from "../Assets/drizzle.png";
import rain from "../Assets/rain.png";
import snow from "../Assets/snow.png";
const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const inputref = useRef();
  const allicons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "13d": snow,
    "13n": snow,
  };
  const search = async (city) => {
    if (city === "") {
      alert("please enter city name");
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      const icon = allicons[data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
    }
  };
  useEffect(() => {
    search("hyderabad");
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-2 rounded-xl px-5 py-5">
      <div className="flex items-center gap-2">
        <input
          ref={inputref}
          type="text"
          placeholder="Search"
          className="rounded-lg px-2 py-2  border-black w-full bg-slate-300 placeholder:text-gray-600"
        />
        <img
          src="https://cdn.pixabay.com/photo/2016/03/31/19/14/magnifying-glass-1294834_640.png"
          alt=""
          srcset=""
          className="w-6"
          onClick={() => search(inputref.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <div className="flex flex-col items-center gap-4 mt-4">
            <img src={weatherData.icon} alt="" className="w-32" />
            <p className="text-5xl font-semibold">
              {weatherData.temperature}°C
            </p>
            <p className="text-2xl font-medium">{weatherData.location}</p>
          </div>
          <div className="flex gap-6 mt-8 ">
            <div className="flex gap-1">
              <img
                src="https://cdn-icons-png.flaticon.com/128/13944/13944027.png"
                alt=""
                className="w-10"
              />
              <div>
                <p className="text-xl">{weatherData.humidity} %</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="flex gap-1">
              <img
                src="https://cdn-icons-png.flaticon.com/128/959/959711.png"
                alt=""
                className="w-10"
              />
              <div>
                <p className="text-xl">{weatherData.windSpeed}</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <> </>
      )}
    </div>
  );
};

export default Weather;
