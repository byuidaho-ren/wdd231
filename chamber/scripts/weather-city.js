const API_KEY = 'b29b83b5e69548e7ef3d6aadc9d34700';
const LAT = 14.3297;
const LON = 120.9367;
const TIMEZONE = 'Asia/Manila'; // reuse timezone string

// Helper: Fetch JSON or throw error if response not OK
async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  return res.json();
}

// Format a UNIX timestamp to date/time strings in Manila timezone
function formatDateTime(timestamp) {
  const date = new Date(timestamp * 1000);

  return {
    dayName: date.toLocaleDateString('en-US', { weekday: 'long', timeZone: TIMEZONE }),
    dateString: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: TIMEZONE }),
    timeString: date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: TIMEZONE,
    }),
  };
}

// Display current weather data in the #weatherBox element
async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;
    const data = await fetchJson(url);
    const { dayName, dateString, timeString } = formatDateTime(data.dt);

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
  } catch (err) {
    document.getElementById('weatherBox').textContent = 'Error loading weather data.';
    console.error('Fetch error:', err);
  }
}

// Convert YYYY-MM-DD string to day name in Manila timezone
function getDayName(dateString) {
  const date = new Date(dateString + 'T00:00:00'); // force midnight
  return date.toLocaleDateString('en-US', { weekday: 'long', timeZone: TIMEZONE });
}

// Display 3-day forecast in the #forecast element
async function getForecast() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;
    const data = await fetchJson(url);
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '';

    // Group forecast list items by date (YYYY-MM-DD)
    const dailyData = {};
    data.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyData[date]) dailyData[date] = [];
      dailyData[date].push(item);
    });

    // Get today's date in Manila timezone (ISO YYYY-MM-DD)
    const now = new Date();
    const todayManila = now.toLocaleDateString('en-CA', { timeZone: TIMEZONE });

    // Filter out today, keep next days
    const futureDates = Object.keys(dailyData).filter(date => date > todayManila);
    const next3Days = futureDates.slice(0, 3);

    if (next3Days.length === 0) {
      forecastDiv.textContent = 'No forecast data available for upcoming days.';
      return;
    }

    // For each day, calculate avg temp and pick midday weather
    next3Days.forEach(date => {
      const dayData = dailyData[date];

      // Average temperature for the day
      const avgTemp = (dayData.reduce((sum, d) => sum + d.main.temp, 0) / dayData.length).toFixed(1);

      // Use forecast closest to 12:00 PM or fallback to first data point
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
  } catch (err) {
    document.getElementById('forecast').textContent = 'Error loading forecast data.';
    console.error('Forecast fetch error:', err);
  }
}

// Run both functions
getWeather();
getForecast();
