// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Craete base layer to hold both maps
let baseMaps = {
    Light: light,
    Dark: dark
};
// Create map object with center, zoom, and default layer
let map = L.map('mapid',{
    center: [44, -80],
    zoom: 2,
    layers: [dark]
});
// Pass map layers into layers control and add control to map
L.control.layers(baseMaps).addTo(map);

// Accessing toronto GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/BrianForth/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/torontoRoutes.json";

// Grabbing GeoJSON data
d3.json(torontoData).then(function(data){
    console.log(data);
    // Creating GeoJSON layer with retrieved data
    L.geoJson(data, {
        color: "yellow",
        weight: 2,
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr> <h3> Destination: " + feature.properties.dst + "</h3>");
        }
    }).addTo(map);
});

