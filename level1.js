



// Create a map object
const myMap = L.map("map", {
    center: [16, -30],
    zoom: 4
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/dark-v10",
    accessToken: API_KEY
  }).addTo(myMap);

  const link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson"

  d3.json(link).then( function(data) {
   
    const eq = data.features;  
    eq.forEach((item,i)=> {


        let color = "";
        if (eq[i].properties.sig > 1000) {
          
          color = "#85092E";
        }
        else if (eq[i].properties.sig > 500) {
          circleColor = "#A80C3B";
        }
    
        else if (eq[i].properties.sig > 100) {
          color = "#CF0E48";
        }
        else {
          color = "#FF1259";
        }

   // console.log(eq[i].geometry.coordinates[1]);
    L.circle(([eq[i].geometry.coordinates[1], eq[i].geometry.coordinates[0]]),  {

        fillOpacity: 0.75,
        color: "white",
        fillColor:  color,
        // Adjust radius
        radius: ((eq[i].properties.mag)*2000)
      }).bindPopup("<h4> Earthquake: " + eq[i].properties.place+ "<h4> <hr> <h4>Time: " +  eq[i].properties.mag + "</h4> <hr> <h4> Significance: " + eq[i].properties.sig + "</h4>").addTo(myMap);;


});



});
