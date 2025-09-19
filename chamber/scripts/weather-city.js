const API_KEY = 'b29b83b5e69548e7ef3d6aadc9d34700'; // Replace with your OpenWeatherMap API key
    const LAT = 14.3297;
    const LON = 120.9367;

 function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then(data => {
        const utcDate = new Date(data.dt * 1000);

        const dayName = utcDate.toLocaleDateString('en-US', {
          weekday: 'long',
          timeZone: 'Asia/Manila'
        });

        const dateString = utcDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'Asia/Manila'
        });

        const timeString = utcDate.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          timeZone: 'Asia/Manila'
        });

        document.getElementById('weatherBox').innerHTML = `
          <strong>City:</strong> ${data.name}, ${data.sys.country}<br>
          <strong>Latitude:</strong> ${data.coord.lat}<br>
          <strong>Longitude:</strong> ${data.coord.lon}<br>
          <strong>Temperature:</strong> ${data.main.temp} °C<br>
          <strong>Condition:</strong> ${data.weather[0].description}<br>
          <strong>Day:</strong> ${dayName}<br>
          <strong>Date:</strong> ${dateString}<br>
          <strong>Local Time:</strong> ${timeString}
        `;
      })
      .catch(err => {
        document.getElementById('weatherBox').textContent = 'Error loading weather data.';
        console.error('Fetch error:', err);
      });
  }

  getWeather();


  function getDayName(dateString) {
    const date = new Date(dateString + 'T00:00:00'); // force midnight
    return date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Asia/Manila' });
  }

  function getForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then(data => {
        const forecastDiv = document.getElementById('forecast');
        forecastDiv.innerHTML = '';

        // Group data by date (YYYY-MM-DD)
        const dailyData = {};
        data.list.forEach(item => {
          const date = item.dt_txt.split(' ')[0];
          if (!dailyData[date]) dailyData[date] = [];
          dailyData[date].push(item);
        });

        // Get today's date in Manila timezone as YYYY-MM-DD string
        const now = new Date();
        const todayManilaStr = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Manila' }); // en-CA is yyyy-mm-dd

        // Get all dates from dailyData and filter out today
        const futureDates = Object.keys(dailyData).filter(date => date > todayManilaStr);

        // Take next 3 days from futureDates
        const next3Days = futureDates.slice(0, 3);

        if (next3Days.length === 0) {
          forecastDiv.textContent = 'No forecast data available for upcoming days.';
          return;
        }

        next3Days.forEach(date => {
          const dayData = dailyData[date];

          // Calculate average temp for day
          const avgTemp = (dayData.reduce((sum, d) => sum + d.main.temp, 0) / dayData.length).toFixed(1);

          // Pick weather description & icon from the midday forecast (around 12:00)
          const midday = dayData.find(d => d.dt_txt.includes('12:00:00')) || dayData[0];
          const weatherDesc = midday.weather[0].description;
          const iconCode = midday.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

          const dayName = getDayName(date);

          forecastDiv.innerHTML += `
            <div class="forecast-day">
              <strong>${dayName}</strong><br>
              <img src="${iconUrl}" alt="${weatherDesc}" /><br>
              Condition: ${weatherDesc}<br>
              Avg Temp: ${avgTemp} °C<br>
              Date: ${date}
            </div>
          `;
        });
      })
      .catch(err => {
        document.getElementById('forecast').textContent = 'Error loading forecast data.';
        console.error('Forecast fetch error:', err);
      });
  }

  getForecast();