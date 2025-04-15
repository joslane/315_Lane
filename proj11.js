const weatherOutput = document.getElementById('weather-output');

// API information
const apiKey = 'dad9508ac156777256a232d8a067d3e6';
const city = 'Lynchburg,US-VA';
const units = 'imperial';

// HTTP FETCH for weather
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=${units}`)
  .then(response => {
    if (!response.ok) {
        // catch bad request
      throw new Error(`Weather data not available: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    // show weather data (location, temperature, and description from the API)
    const temp = data.main.temp;
    const desc = data.weather[0].description;
    weatherOutput.innerHTML = `🌤️ ${city}: ${temp}°F, ${desc}`;
  })
  .catch(error => {
    // catch invalid weather overview
    weatherOutput.innerHTML = `<span style="color: red;">Failed to load weather: ${error.message}</span>`;
  });

// XMLHttpRequest
function getWeatherWithXHR() {
  const xhr = new XMLHttpRequest();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  xhr.open("GET", url);
  xhr.onload = function () {
    if (xhr.status === 200) {
        // show weather from the API
      const data = JSON.parse(xhr.responseText);
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      weatherOutput.innerHTML = `🌤️ ${city}: ${temp}°F, ${desc} (via XHR)`;
    } else {
        // catch error
      weatherOutput.innerHTML = `<span style="color: red;">XHR Error: ${xhr.statusText}</span>`;
    }
  };
  xhr.onerror = function () {
    // catch failure to reach the server
    weatherOutput.innerHTML = `<span style="color: red;">XHR failed to reach the server.</span>`;
  };
  xhr.send();
}