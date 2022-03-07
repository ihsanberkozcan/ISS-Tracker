const ISS_Api = 'https://api.wheretheiss.at/v1/satellites/25544'


const mymap = L.map('mapid').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);



var issIcon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [20, 20],

});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);

let firstTime = true;
async function getISS() {
    const response = await fetch(ISS_Api);
    const data = await response.json();
    const { latitude, longitude } = data;

    marker.setLatLng([latitude, longitude])
    if (firstTime) {
        mymap.setView([latitude, longitude], 3);
        firstTime = false;
    }

    document.getElementById('lat').textContent = latitude.toFixed(2);
    document.getElementById('lon').textContent = longitude.toFixed(2);


    console.log(latitude, longitude);


}
getISS()
setInterval(getISS, 1000)
