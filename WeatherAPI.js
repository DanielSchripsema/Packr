export default class WeatherAPI{

    
}

export function getData() {
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=52.23&lon=4.55&appid=7dc04d1ee7d3fad465b67c1cde4e3206')
        .then(res => {
               return res.json();
        })
        .then(data => {

            console.log(data.wind.deg);

            
            console.log(data);

        })
        .catch(error => console.log("Doesn't exist"));
}