// ===== KLOCKA & DATUM =====
function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit'
  });
  document.getElementById("date").textContent = now.toLocaleDateString('sv-SE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
setInterval(updateClock, 1000);
updateClock();

// ===== VÄDER =====
const weatherKey = "DIN_OPENWEATHER_API_KEY"; // <-- Byt till din OpenWeather API-nyckel
const city = "Storvreta";

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherKey}&lang=sv`)
  .then(res => res.json())
  .then(data => {
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    document.getElementById("weather").textContent = `${temp}°C, ${desc}`;
  })
  .catch(() => {
    document.getElementById("weather").textContent = "Väder ej tillgängligt";
  });

// ===== BAKGRUND (slumpade naturbilder från Unsplash) =====
function updateBackground() {
  fetch("https://source.unsplash.com/random/1920x1080/?nature,landscape")
    .then((response) => {
      document.body.style.backgroundImage = `url(${response.url})`;
    })
    .catch(() => {
      document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')";
    });
}
updateBackground();
setInterval(updateBackground, 60000);

// ===== KALENDER =====
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    locale: 'sv',
    initialView: 'dayGridMonth',
    googleCalendarApiKey: 'DIN_GOOGLE_API_KEY', // <-- Byt till din Google API-nyckel
    eventSources: [
      {
        googleCalendarId: 'arshia.ksabet@gmail.com',
        className: 'mine'
      },
      {
        googleCalendarId: 'maya.yeranossian@gmail.com',
        className: 'partners'
      }
    ]
  });

  calendar.render();
});
