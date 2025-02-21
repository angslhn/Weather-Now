import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faWind, faGauge, faDroplet, faSun } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from "axios";

const Main = () => {
    const [data, setData] = useState(null)
    const [imageSource, setImageSource] = useState(null)
    const [location, setLocation] = useState(null)
  
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          async function fetchWeatherData() {
            try {
                const response = await axios.get(`https://api.weatherapi.com/v1/current.json`, {
                    params: {
                        key: import.meta.env.VITE_API_KEY,
                        q: `${position.coords.latitude},${position.coords.longitude}`
                    }
                });

                // setLocation({latitude: position.coords.latitude, longitude: position.coords.longitude})
                setData(response.data);
            } catch {
              throw new Error("Failed to get data!");
            }
          }

          fetchWeatherData()
        },
        () => {
          console.log("Gagal Mendapatkan Lokasi")
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    }, []);

    useEffect(() => {
        async function fetchImageWeatherSource () {
            try {
                const response = await axios.get('https://api-weathernow.vercel.app/image')
                setImageSource(response.data[0].src)
            } catch {
                throw new Error("Failed to get data!")
            }
        }

        fetchImageWeatherSource()
    }, [data])

    useEffect(() => {
        const setCookie = (name, value, minutes) => {
            const expires = new Date(Date.now() + minutes * 60 * 1000).toUTCString();
            document.cookie = `${name}=${value}; expires=${expires}; path=/`;
        };
        
        const getCookie = (name) => {
            const cookies = document.cookie.split('; ');
            const cookie = cookies.find(row => row.startsWith(`${name}=`));
            return cookie ? cookie.split('=')[1] : null;
        };

        const fetchSaveLocation = async () => {
            try {
                const cookieName = 'location';
        
                if (getCookie(cookieName)) return;
        
                if (location) {
                    await axios.post('https://api-weathernow.vercel.app/save', location);
                    setCookie(cookieName, 'true', 5);
                }
            } catch {
                console.error("A data error occurred!");
            }
        }

        fetchSaveLocation()
    }, [location])

    return (
        <main>
            <div className="weathernow__check__wrapper">
                <div className="weathernow__check__city__title">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <h2 className="weathernow__check__city__title__text">{ data?.location?.name }</h2>
                </div>
                <div className="weathernow__check__information__weather">
                    <div className="weathernow__check__information__weather__and__temprature">
                        <span className="weathernow__check__information__weather__name">
                         { data && String(data?.current?.condition?.text).split(" ").map((text) => text[0].toUpperCase() + text.slice(1).toLowerCase()).join(" ") }
                        </span>
                        <span className="weathernow__check__information__temprature__value">
                            { data?.current?.temp_c }°C
                        </span>
                    </div>
                    <div className="weathernow__check__information__weather__icon">
                        <img src={ imageSource?.[String(data?.current?.condition?.code)] || imageSource?.["1030"] } alt=""/>
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
                            { data?.current?.uv }
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
                            { data?.current?.humidity }%
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
                            { data?.current?.wind_kph } kph
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
                                { data?.current?.pressure_mb } mb
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Main