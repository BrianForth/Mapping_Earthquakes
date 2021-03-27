// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// We create the tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Craete base layer to hold both maps
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};
// Create map object with center, zoom, and default layer
let map = L.map('mapid',{
    center: [43.7, -79.3],
    zoom: 11,
    layers: [streets]
});
// Pass map layers into layers control and add control to map
L.control.layers(baseMaps).addTo(map);

// Accessing toronto GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/BrianForth/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";

// Grabbing GeoJSON data
d3.json(torontoHoods).then(function(data){
    console.log(data);
    // Creating GeoJSON layer with retrieved data
    L.geoJson(data, {
        color: "blue",
        weight: 1,
        fillColor: "yellow",
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h3> Neighborhood: " + feature.properties.AREA_NAME + "</h3>");
        }
    }).addTo(map);
});

