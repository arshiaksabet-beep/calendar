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
const weatherKey = "4bc8d59a2e088e65153e243b1c613159"; // <-- Byt till din OpenWeather API-nyckel
const city = "Storvreta";

console.log("🔍 Hämtar väder för:", city);

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherKey}&lang=sv`)
  .then(res => {
    console.log("🌐 OpenWeather API status:", res.status);
    return res.json();
  })
  .then(data => {
    console.log("📦 OpenWeather data:", data);
    if (data && data.main && data.weather) {
      const temp = Math.round(data.main.temp);
      const desc = data.weather[0].description;
      document.getElementById("weather").textContent = `${temp}°C, ${desc}`;
    } else {
      document.getElementById("weather").textContent = "Väder ej tillgängligt";
    }
  })
  .catch(err => {
    console.error("❌ Fel vid hämtning av väder:", err);
    document.getElementById("weather").textContent = "Väder ej tillgängligt";
  });

// ===== BAKGRUND (slumpade naturbilder från Unsplash) =====
function updateBackground() {
  const imgUrl = `https://source.unsplash.com/1920x1080/?nature,landscape&sig=${Math.random()}`;
  document.body.style.backgroundImage = `url(${imgUrl})`;
}
updateBackground();
setInterval(updateBackground, 60000);
// ===== KALENDER =====
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  console.log("📅 Initierar kalender...");
  console.log("🔑 Google API-nyckel:", "AIzaSyBjISq4iARfP_ef3e2Hnl8lCK9Qzq2W1Ls");
  
  var calendar = new FullCalendar.Calendar(calendarEl, {
    locale: 'sv',
    initialView: 'dayGridMonth',
    googleCalendarApiKey: 'AIzaSyBjISq4iARfP_ef3e2Hnl8lCK9Qzq2W1Ls', // <-- Byt till din Google API-nyckel
    eventSources: [
      {
        googleCalendarId: 'arshia.ksabet@gmail.com',
        className: 'mine'
      },
      {
        googleCalendarId: 'maya.yeranossian@gmail.com',
        className: 'partners'
      }
    ],
    events: function(fetchInfo, successCallback, failureCallback) {
      console.log("📡 Hämtar events mellan:", fetchInfo.startStr, "och", fetchInfo.endStr);
    }
  });

  calendar.render();
  console.log("✅ Kalendern är renderad");
});
