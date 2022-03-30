export default class WeatherAPI{

    
}

export function getData(longitude, latitude) {
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=7dc04d1ee7d3fad465b67c1cde4e3206')
        .then(res => {
               return res.json();
        })
        .then(data => {
        document.getElementById('CounrtyTemp').innerHTML = "country: " + data.sys.country + " temp: " + data.wind.deg + " Weather: " + data.weather[0].main;
        })
        .catch(error => console.log("Doesn't exist"));
}

