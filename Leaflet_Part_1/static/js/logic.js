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
  
  // let geojson;
  
  // Get the data with d3.
  d3.json(geoData).then(function(data) {

  L.geojson(data).addTo(myMap)
  
  // Loop through the data.
  for (let i = 0; i < data.length; i++) {

    // Set the data location property to a variable.
    let location = data[i].location.geometry.coordinates;

    // Check for the location property.
    if (location) {

      // Add a new marker to the cluster group, and bind a popup.
      markers.addLayer(L.marker([location.geometry.coordinates[1], location.geometry.coordinates[0]])
        .bindPopup(data[i].descriptor));
    }
 // Add our marker cluster layer to the map.
 myMap.addLayer(markers);
  }
  
  console.log(data);

   // Conditionals for earthquake magnitude by their size and depth of the earthquake by colour
   let color = "";
   if (location.geometry.controls[2] > 90) {
     color = "black";
   }
   else if (location.geometry.controls[2] > 70) {
     color = "purple";
   }
   else if (location.geometry.controls[2] > 50) {
     color = "blue";
   }
   else if (location.geometry.controls[2] > 30) {
    color = "green";
   }
  else if (location.geometry.controls[2] > 10) {
    color = "yellow";
   }
  else {
     color = "white";
   }
 
  
    
  
});