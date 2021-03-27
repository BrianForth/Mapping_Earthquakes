// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// We create the tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});
// Pass map layers into layers control and add control to map
L.control.layers(baseMaps).addTo(map);

// Grabbing GeoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data){
    console.log(data);
    // Function to return style data for earthquakes
    function styleInfo(feature){
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: "#ffae42",
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        }
    }

    // Function to return radius based on quake magnitude
    function getRadius(magnitude){
        if (magnitude === 0){
            return 1;
        }
        return magnitude * 4;
    }
    // Creating GeoJSON layer with retrieved data
    L.geoJson(data,{
        // Features => circleMarkers
        pointToLayer: function(feature, latlng){
            console.log(data);
            return L.circleMarker(latlng);
        },
        // Setting style for circleMarkers using styleInfo function (Line 34)
        style: styleInfo
    }).addTo(map);
});

