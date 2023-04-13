console.log('geoloc.js loaded');


const map = L.map('map').fitWorld();

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


const geo = navigator.geolocation;

function onLocationFound(e) {
    const locationMarker = L.marker(e.latlng).addTo(map)
    document.querySelector(".dialogue").style.display = "block";
    if (locationMarker != null) {
        geo.watchPosition(function (position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            locationMarker.setLatLng([lat, lon]);
            map.setView([lat, lon]);
        });
    }
}

function deg2rad(userLat) {
    return userLat * (Math.PI / 180)
}

function getDistanceFromLatLonInKm(userLat, userLong, x, y) {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(x - userLat);  // deg2rad below
    let dLon = deg2rad(y - userLong);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(userLat)) * Math.cos(deg2rad(x)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // Distance in km
    return R * c;
}

let inrange = false;

function detectUserLocationInRange(x, y) {
    if (geo) {
        geo.getCurrentPosition(function (position) {
            let userLat = position.coords.latitude;
            let userLong = position.coords.longitude;
            let distance = getDistanceFromLatLonInKm(userLat, userLong, x, y);
            if (distance < 0.03) {
                console.log("in range");
                inrange = true;
            } else {
                console.log("out of range");
                inrange = false;
            }
        });
    }
}


function onLocationError(e) {
    alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({setView: true, maxZoom: 16});