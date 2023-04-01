const PIXELS_PER_MAG = 5;


// Conditionals for earthquake magnitude by their size and depth of the earthquake by colour
function depthColor(depth) {

  let color = "";
  if (depth > 90) {
    color = "black";
  }
  else if (depth > 70) {
    color = "purple";
  }
  else if (depth > 50) {
    color = "blue";
  }
  else if (depth > 30) {
   color = "green";
  }
 else if (depth > 10) {
   color = "yellow";
  }
 else {
    color = "white";
  }
  
  return color;
 }  

function styleInfo(color, radius) {
  let info = {
    opacity: 1,
    fillOpacity: 1,
    fillColor: color,
    color: "black",
    radius: radius,
    stroke: true,
    weight: 0.5
  };

return info;
}

 // Creating the map object
let myMap = L.map("map", {
    center: [0.0, 0.0],
    zoom: 3
  });
let majorEarthquakes = new L.LayerGroup();

  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Load the GeoJSON data.
  let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
  
  // let geojson;
  
  // Get the data with d3.
  d3.json(geoData).then(function(data) {

    L.geoJSON(data).addTo(myMap);
   console.log(data)

    // Loop through the data.
    for (let i = 0; i < data.features.length; i++) {
    
      console.log(data.features[i])

      // Set the data location property to a variable.
      let coordinates = data.features[i].geometry.coordinates;
      let properties = data.features[i].properties;
      
      // Check for the location property.
      if (coordinates) {
        let color = depthColor(coordinates[2]);
        let radius = properties.mag * PIXELS_PER_MAG;
        console.log(radius)

        // Add a new marker to the cluster group, and bind a popup.
        let style = styleInfo(color, radius);
        majorEarthquakes.addLayer(L.circleMarker([coordinates[1], coordinates[0]], style)
          .bindPopup(properties.place));
      }
  // Add our marker cluster layer to the map.
  myMap.addLayer(majorEarthquakes);
    }
  
});

