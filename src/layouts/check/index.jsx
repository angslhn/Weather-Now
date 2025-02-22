import { useEffect, useState } from 'react';
import axios from "axios";

import Header from "../../page/header";
import Main from "../../page/main/check";
import Footer from "../../page/footer";
import Loader from '../../elements/loader';

import { Alert } from '@mui/material';

const Home = () => {
  const [data, setData] = useState(null);
  const [imageSource, setImageSource] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState({ weather: true, image: true })
  const [checkingLocation, setCheckingLocation] = useState(true);
  const [locationAccess, setLocationAccess] = useState(true)
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationAccess(true)
        setCheckingLocation(false)

        async function fetchWeatherData() {
          try {
            setLoading((prev) => ({...prev, weather: true}))

            const response = await axios.get(
              `https://api.weatherapi.com/v1/current.json`,
              {
                params: {
                  key: import.meta.env.VITE_API_KEY,
                  q: `${position.coords.latitude},${position.coords.longitude}`,
                },
              }
            );

            setLocation({latitude: position.coords.latitude, longitude: position.coords.longitude})
            setData(response?.data);
          } catch {
            throw new Error("Failed to get data!");
          } finally {
            setLoading((prev) => ({...prev, weather: false}))
          }
        }

        fetchWeatherData();
      },
      () => {
        setLocationAccess(false);
        setCheckingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  }, []);

  useEffect(() => {
    if (!data) return;

    async function fetchImageWeatherSource() {
      try {
        setLoading((prev) => ({...prev, image: true}))

        const response = await axios.get(
          "https://api-weathernow.vercel.app/image"
        );
        
        setImageSource(response?.data[0]?.src);
      } catch {
        throw new Error("Failed to get data!");
      } finally {
        setLoading((prev) => ({...prev, image: false}))
      }
    }

    fetchImageWeatherSource();
  }, [data]);

  useEffect(() => {
    const setCookie = (name, value, minutes) => {
      const expires = new Date(Date.now() + minutes * 60 * 1000).toUTCString();
      document.cookie = `${name}=${value}; expires=${expires}; path=/`;
    };

    const getCookie = (name) => {
      const cookies = document.cookie.split("; ");
      const cookie = cookies.find((row) => row.startsWith(`${name}=`));
      return cookie ? cookie.split("=")[1] : null;
    };

    const fetchSaveLocation = async () => {
      try {
        const cookieName = "location";

        if (getCookie(cookieName)) return;

        if (location) {
          await axios.post("https://api-weathernow.vercel.app/save", location);
          setCookie(cookieName, "true", 5);
        }
      } catch {
        console.error("A data error occurred!");
      }
    };

    fetchSaveLocation();
  }, [location]);

  return (
    <>
      <Header/>
      {
        (checkingLocation) ?
          <Loader/>
        : !locationAccess ?
          <Alert variant='filled' severity="error">
            Oops! Unable to get location access at this time.
          </Alert>
        : (!loading.weather && !loading.image) ?
          <Main weather={data} image={imageSource} />
        :
          <Loader/>
        } 
      <Footer/>
    </>
  );
};

export default Home;
