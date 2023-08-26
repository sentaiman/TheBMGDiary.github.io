const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");


toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click" , () =>{
    sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode";
    }else{
        modeText.innerText = "Dark mode";
        
    }
});

function updateDate() {
    const dateElement = document.getElementById('date');
    const currentDate = new Date();
    
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('default', { month: 'short' });
    
    const formattedDate = `${day} ${month}`;
    
    dateElement.textContent = formattedDate;
}

updateDate();

async function fetchWeather() {
    const apiKey = 'YOUR_API_KEY';
    const weatherElement = document.getElementById('weather');

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=YourCity&appid=${apiKey}&units=metric`);
        const data = await response.json();
        
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        
        weatherElement.textContent = `${temperature}°C, ${weatherDescription}`;
    } catch (error) {
        weatherElement.textContent = 'Weather data not available';
        console.error('Error fetching weather:', error);
    }
}

fetchWeather();
