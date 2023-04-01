// Creating the map object
let myMap = L.map("map", {
    center: [0.0, 0.0],
    zoom: 3
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Load the GeoJSON data.
  let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
  
  let geojson;
  
  // Get the data with d3.
  d3.json(geoData).then(function(data) {
  
    // Create a new marker cluster group.
  let markers = L.markerClusterGroup();

  // Loop through the data.
  for (let i = 0; i < data.length; i++) {

    // Set the data location property to a variable.
    let location = data[i].location;

    // Check for the location property.
    if (location) {

      // Add a new marker to the cluster group, and bind a popup.
      markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
        .bindPopup(data[i].descriptor));
    }
 // Add our marker cluster layer to the map.
 myMap.addLayer(markers);
  }
  
  
    console.log(data);
  
});