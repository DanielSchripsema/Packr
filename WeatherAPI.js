
const nlCoardinates = { lat: 52, lon: 5};
let currentCords = nlCoardinates;
let time = 5000;

class WeatherAPI{

        constructor(){
                setInterval(this.getData, time)
        }

        changeCords(latInput, lonInput){
                currentCords = { lat: latInput, lon: lonInput};
        }
        
        getData() {
                fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + currentCords.lat + '&lon=' + currentCords.lon + '&appid=7dc04d1ee7d3fad465b67c1cde4e3206')
                .then(res => {
                       return res.json();
                })
                .then(data => {
                document.getElementById('CounrtyTemp').innerHTML = "country: " + data.sys.country + " temp: " + (Math.ceil(data.main.temp - 273.15)) + " Weather: " + data.weather[0].main;
                })
                .catch(error => console.log("Weather was not able to be fetched"));
        }
        
        
        async  getWeather() {
                let weather;
                await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + currentCords.lat + '&lon=' + currentCords.lon + '&appid=7dc04d1ee7d3fad465b67c1cde4e3206')
                .then(res => {
                       return res.json();
                })
                .then(data => {
                        weather = data.weather[0].main;
                })
                .catch(error => console.log("Weather was not able to be fetched"));
                return weather;
        }
}
export default WeatherAPI



