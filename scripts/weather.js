window.weather = {}

weather.convCtoF = function(x){
    return Math.round(x*1.8+32)
}

weather.cardinal = function(x){
    // Normalize the degrees to be within 0-359
    let degrees = (x % 360 + 360) % 360;

    const directions = [
        "N", "NNE", "NE", "ENE",
        "E", "ESE", "SE", "SSE",
        "S", "SSW", "SW", "WSW",
        "W", "WNW", "NW", "NNW"
    ];

    // Each direction covers 22.5 degrees (360 / 16)
    const index = Math.round(degrees / 22.5);

    return directions[index % 16]; // Use modulo 16 to handle 360 degrees wrapping back to North
}

weather.convKMtoMPH = function(x){
    return Math.round(x/1.61)
}

weather.convPAtoINHG = function(x){
    return (x/3386.4).toFixed(2)
}

weather.cram = function(){
    const temp = document.getElementById("weather-temp")
    const status = document.getElementById("weather-status")
    const icon = document.getElementById("weather-icon")
    
    const winddir = document.getElementById("weather-wind-dir")
    const windsp = document.getElementById("weather-wind-sp")
    const humid = document.getElementById("weather-humid")
    const pres = document.getElementById("weather-pres")

    const forecast = document.getElementById("weather-forecast")
    const forecast_template = document.querySelector("#weather-forecast template")

    temp.innerHTML = `${this.convCtoF(product.weather.current_conditions.temp)}&deg;`
    status.innerText = product.weather.current_conditions.desc
    icon.src = product.weather.current_conditions.icon

    winddir.innerText = this.cardinal(product.weather.current_conditions.wind_dir)
    windsp.innerText = this.convKMtoMPH(product.weather.current_conditions.wind_sp)

    humid.innerText = Math.round(product.weather.current_conditions.hum)
    pres.innerText = this.convPAtoINHG(product.weather.current_conditions.pres)

    let index = 1
    product.weather.forecast.forEach(element => {
        const new_thing = forecast_template.content.cloneNode(true)
        const fc_label = new_thing.querySelector(".weather-forecast-day")
        const fc_temp = new_thing.querySelector(".weather-forecast-temp")
        const fc_icon = new_thing.querySelector(".weather-forecast-icon")
        const fc_chance = new_thing.querySelector(".weather-forecast-chance")
        
        fc_label.innerText = element.label.toUpperCase()
        fc_temp.innerHTML = `${element.temp}&deg;`
        fc_icon.src = element.icon
        fc_chance.innerHTML = `${element.precip}%`

        const destination = forecast.querySelector(`#forecast-${index}`)
        destination.innerHTML = ""
        destination.appendChild(new_thing)
        index++
    });
}