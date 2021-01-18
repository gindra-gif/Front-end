let searchBox = document.querySelector(".search-input");
let searchButton = document.querySelector(".btn");
let table = document.querySelector("table");
let tbody = document.querySelector("tbody");
searchButton.addEventListener("click", function(event){
    loadMeteo(searchBox.value);
});
function loadMeteo(place) {
    url="https://api.meteo.lt/v1/places/"+place+"/forecasts/long-term";

    var meteo = new XMLHttpRequest();
    meteo.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let rezultatas = JSON.parse(meteo.responseText);
            tbody.innerHTML = "";
            let orasHTML = "";
            for(let i=0; i < rezultatas.forecastTimestamps.length; i++) {
                orasHTML = orasHTML + '<tr><td>' + rezultatas.forecastTimestamps[i].airTemperature + '</td><td>'+rezultatas.forecastTimestamps[i].cloudCover+'</td><td>'  + rezultatas.forecastTimestamps[i].windSpeed +  '</td></tr>';
            }
            tbody.innerHTML = orasHTML;
        } else  tbody.innerHTML = '<tr><td>Nerasta</td></tr>';
    };
    meteo.open("GET", url, true);
    meteo.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
    meteo.send(null);
}
