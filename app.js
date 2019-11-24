window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span')

    let temperatureElement = document.querySelector('.temperature');
    let locationElement = document.querySelector('.location');
    let loaderElement = document.querySelector('.loader');
    let loaderTextElement = document.querySelector('.loader-text');


    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/42f318d7c11c8bd3cb675b98a1a79e30/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const {temperature, summary, icon} = data.currently;
                    temperatureDegree.textContent = temperature; 
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    let celsius = (temperature - 32) + ( 5 / 9);

                    setIcons(icon, document.querySelector('.icon'));

                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === "°F") {
                            temperatureSpan.textContent = "°C";
                            temperatureDegree.textContent = Math.floor(celsius)
                        } else {
                            temperatureSpan.textContent = "°F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                    
                    loaderElement.classList.add("hidden");
                    loaderTextElement.classList.add("hidden");
                    temperatureElement.classList.remove("hidden");
                    locationElement.classList.remove("hidden");
                });
       });
    }


    function setIcons(icon, iconID) {
        var skycons = new Skycons({"color": "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        skycons.add(iconID, Skycons[currentIcon]);

    }
    
});