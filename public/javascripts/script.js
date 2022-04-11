

var mymap = L.map('worldmap', {
     center: [48.866667, 2.333333],
     zoom: 13
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '(c) <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);



//Customisation d'un marker (choix de deux images au préalable)
var customIcon = L.icon({
     iconUrl: '/images/leaf-green.png',
     shadowUrl: '/images/leaf-shadow.png',
    
     iconSize:   [38, 95],
     shadowSize:  [50, 64],
    
     iconAnchor:  [22, 94],
     shadowAnchor: [4, 62],  
    
     popupAnchor: [-3, -76]
    });

//Création d'un marker et Ajout d'un popup sur le marker
var cityIcons = document.getElementsByClassName('cityIcons')

for(let i=0; i<cityIcons.length; i++){
L.marker([cityIcons[i].dataset.lat, cityIcons[i].dataset.lon], {icon: customIcon}).addTo(mymap).bindPopup(cityIcons[i].dataset.name);

}



L.Routing.control({
     waypoints: [
       L.latLng(45.75, 4.85),
       L.latLng(48.866667, 2.333333)
     ]
   }).addTo(mymap);






//Création de cercles et polygones

// //Cercles:

// var circle = L.circle(
//  [48.858370, 2.294481],
//  {
//  color: 'red',
//  fillColor: '#f03',
//  fillOpacity: 0.2,
//  radius: 500
//  }
// ).addTo(mymap);

// //Polygones:

// var polygon = L.polygon([
//  [48.858370, 2.294481],
//  [48.873791, 2.295027],
//  [48.865633, 2.321235]
// ]).addTo(mymap);