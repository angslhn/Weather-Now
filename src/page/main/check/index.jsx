import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faWind, faGauge, faDroplet, faSun } from '@fortawesome/free-solid-svg-icons';
import weather from '../../../assets/weather/301.svg'
import { useEffect, useState } from 'react';
import axios from "axios";

const Main = () => {
    const [data, setData] = useState(null)
  
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          (async function fetchWeatherData() {
            try {
                const response = await axios.get(`https://api.weatherapi.com/v1/current.json`, {
                    params: {
                        key: import.meta.env.VITE_API_KEY,
                        q: `${position.coords.latitude},${position.coords.longitude}`
                    }
                });

                setData(response.data);
            } catch {
              throw new Error("Failed to get data!");
            }
          })()
        },
        () => {
          console.log("Gagal Mendapatkan Lokasi")
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }, []);

    console.log(data && data)

    return (
        <main>
            <div className="weathernow__check__wrapper">
                <div className="weathernow__check__city__title">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <h2 className="weathernow__check__city__title__text">{ data && data.location.name }</h2>
                </div>
                <div className="weathernow__check__information__weather">
                    <div className="weathernow__check__information__weather__and__temprature">
                        <span className="weathernow__check__information__weather__name">
                         { data && data.current.condition.text }
                        </span>
                        <span className="weathernow__check__information__temprature__value">
                            { data && data.current.temp_c }°C
                        </span>
                    </div>
                    <div className="weathernow__check__information__weather__icon">
                        <img src={ weather } alt=""/>
                    </div>
                </div>
                <div className="weathernow__check__information__other">
                    <div className="weathernow__check__information__uv__index">
                        <div className="weathernow__check__information__uv__index__icon">
                            <FontAwesomeIcon icon={faSun} />
                        </div>
                        <div className="weathernow__check__information__uv__index__information">
                            <h3 className="weathernow__check__information__uv__index__title__text">
                                UV Index
                            </h3>
                            <span className="weathernow__check__information__uv__index__value">
                            { data && data.current.uv }
                            </span>
                        </div>
                    </div>
                    <div className="weathernow__check__information__humidity">
                        <div className="weathernow__check__information__humidity__icon">
                            <FontAwesomeIcon icon={faDroplet} />
                        </div>
                        <div className="weathernow__check__information__humidity__information">
                            <h3 className="weathernow__check__information__humidity__title__text">
                                Humidity
                            </h3>
                            <span className="weathernow__check__information__humidity__value">
                            { data && data.current.humidity }%
                            </span>
                        </div>
                    </div>
                    <div className="weathernow__check__information__wind__speed">
                        <div className="weathernow__check__information__wind__speed__icon">
                            <FontAwesomeIcon icon={faWind} />
                        </div>
                        <div className="weathernow__check__information__wind__speed__information">
                            <h3 className="weathernow__check__information__wind__speed__title__text">
                                Wind Speed
                            </h3>
                            <span className="weathernow__check__information__wind__speed__value">
                            { data && data.current.wind_kph } kph
                            </span>
                        </div>
                    </div>
                    <div className="weathernow__check__information__pressure">
                        <div className="weathernow__check__information__pressure__icon">
                            <FontAwesomeIcon icon={faGauge} />
                        </div>
                        <div className="weathernow__check__information__pressure__information">
                            <h3 className="weathernow__check__information__pressure__title__text">
                                Pressure
                            </h3>
                            <span className="weathernow__check__information__pressure__value">
                                { data && data.current.pressure_mb } mb
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Main