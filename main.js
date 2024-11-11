const resizeHeight = (height) => {
  document.querySelector(".wrapper-weather").style.height = `${height}px`;
};

window.addEventListener("resize", resizeHeight);
resizeHeight(window.innerHeight);

const translate = async (text) => {
  try {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|id`);

    const data = await response.json();
    return data.responseData.translatedText;
  } catch (error) {
    console.error("Failed to translate!", error);
  }
};

const weather = async (latitude, longitude) => {
  const response = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=7b2cc9dc801d47f8b34cbd0bc5382f8c`);
  const weatherNow = await response.json();

  showWeather(weatherNow);
};

const showWeather = async (data) => {
  try {
      const showWeather = await data;
      
      let city = showWeather.data[0].city_name;
      let weatherType = await translate(showWeather.data[0].weather.description);
      let weatherTemp = showWeather.data[0].temp + "°";
      let airSpeed = showWeather.data[0].wind_spd;
      let indexUV = showWeather.data[0].uv;
      let pressure = showWeather.data[0].pres;
      let humidity = showWeather.data[0].rh;

      console.log(data);
      
      document.getElementById("city").textContent = city;
      document.getElementById("temp").textContent = weatherTemp;
      document.getElementById("weather").textContent = capitalize(weatherType);
      document.getElementById("icon-weather").setAttribute("src",`https://www.weatherbit.io/static/img/icons/${showWeather.data[0].weather.icon}.png`);

      document.getElementById("air").textContent = `${airSpeed} km/h`;
      document.getElementById("uv").textContent = `${indexUV}`;
      document.getElementById("pressure").textContent = `${pressure} mbar`;
      document.getElementById("humidity").textContent = `${humidity} %`;
    } catch (error) {
        console.log(error);
    }
};


function capitalize(text) {
    return text.split(" ")
    .map((texts) =>
      texts.charAt(0).toUpperCase().concat(texts.slice(1).toLowerCase())
    )
    .join(" ");
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      weather(latitude, longitude);
    },
    (error) => {
      console.log(error);
    },
    {
      enableHighAccuracy: true,
    }
  );
} else {
  alert("Enable access!");
}


(() => {
    const now = new Date();
    const day = new Array("Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu");
    const month = new Array("Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember");

    document.getElementById("date").textContent = `${day[now.getDay()]} | ${month[now.getMonth()]} ${now.getDate()}`;
})();