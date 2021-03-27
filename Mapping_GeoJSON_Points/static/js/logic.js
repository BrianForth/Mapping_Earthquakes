// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
    Street: streets,
    Dark: dark
};
// Create map object with center, zoom, and default layer
let map = L.map('mapid',{
    center: [30, 30],
    zoom: 2,
    layers: [streets]
});
// Pass map layers into layers control and add control to map
L.control.layers(baseMaps).addTo(map);
// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

//Grabbing GeoJSON data
L.geoJSON(sanFranAirport, {
    // Turn features into map markers
    onEachFeature: function(feature, layer){
        console.log(layer);
        layer.bindPopup("<h1> Airport Code: " + feature.properties.faa + "</h1><h2> Airport name: " + feature.properties.name);
    }
}).addTo(map);



// Accessing airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/BrianForth/Mapping_Earthquakes/Mapping_GeoJSON_Points/majorAirports.json";

// Grabbing GeoJSON data
d3.json(airportData).then(function(data){
    console.log(data);
    // Creating GeoJSON layer with retrieved data
    L.geoJson(data, {
        onEachFeature: function(feature, layer){
            console.log(layer);
            layer.bindPopup("<h2> Airport Code: " + feature.properties.faa + "</h2><h3> Airport name: " + feature.properties.name + "</h3>");
    }}).addTo(map);
});

