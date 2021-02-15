"use strict";

//initial parameter declaration
const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const statusIcon = document.querySelector('.weather-status-icon');
const statusSun = document.getElementById("status-sun");
const statusRain = document.getElementById("status-rain");
const statusWinter = document.getElementById("status-winter");
const statusCloud = document.getElementById("status-cloud");
const weatherBox = document.querySelector('.weather-information-box');
const mainInformation = document.getElementById("main-information");
const statusText = document.getElementById("weather-status-text");
const randomJoke = document.getElementById("random-joke");
const errorMessage = document.getElementById("error-message");

// for search button click
searchButton.addEventListener('click', function(){
    retrieveInformation();
})

// for enter key press
searchBox.addEventListener("keyup", function(e){
    if(e.key === "Enter"){
        searchButton.click()
    }
})

// Information retrieval function
function retrieveInformation(){
    errorMessage.style.display="none";
    weatherBox.style.visibility="visible";
    mainInformation.style.visibility="visible";

    const searchText = searchBox.value;
    const weatherApi = `http://api.openweathermap.org/data/2.5/forecast?q=${searchText}&appid=14bc58813644ccff3cc2a5f19dec496b`;
    
    fetch(weatherApi)
    .then(res => res.json())
    .then(data => {
        cityName.innerText = data.city.name;
        console.log(data);
        const tempInK = data.list[0].main.temp;
        const tempInC = ((tempInK-273.15).toFixed(1));
        temperature.innerHTML = `${tempInC} &degC`;
        statusText.innerText = data.list[0].weather[0].description;

        const weatherDescription = data.list[0].weather[0].main;
        console.log(weatherDescription);

        if(weatherDescription == 'Clouds'){
            statusCloud.style.display='block';
            statusWinter.style.display='none';
            statusSun.style.display='none';
            statusRain.style.display='none';
            document.body.style.backgroundImage = 'url(./assets/images/cloudy-day.jpg)';
        }

        else if(weatherDescription == 'Snow'){
            statusCloud.style.display='none';
            statusWinter.style.display='block';
            statusSun.style.display='none';
            statusRain.style.display='none';
            document.body.style.backgroundImage = 'url(./assets/images/winter-day.jpg)';
        }

        else if(weatherDescription == 'Clear'){
            statusCloud.style.display='none';
            statusWinter.style.display='none';
            statusSun.style.display='block';
            statusRain.style.display='none';
            document.body.style.backgroundImage = 'url(./assets/images/sunny-day.jpg)';
        }

        else{
            statusCloud.style.display='none';
            statusWinter.style.display='none';
            statusSun.style.display='none';
            statusRain.style.display='block';
            document.body.style.backgroundImage = 'url(./assets/images/rainy-day.jpg)';
        }

    })
    .catch(error => {
        errorMessage.style.display="block";
        mainInformation.style.visibility="hidden";
    });

    //Random Jokes part
    const jokesApi = 'https://api.chucknorris.io/jokes/random';

    fetch(jokesApi)
    .then(res => res.json())
    .then(data => {
        randomJoke.innerText = data.value;
    });
    searchBox.value = '';
}