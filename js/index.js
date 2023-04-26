"use strict";
// import L from "leaflet";

const app = {
    map: null, // gebruik dit om de map gemakkelijk aan te spreken doorheen de applicatie
    markers: [],
    init() {
        // initialise de kaart
        this.map = L.map('map').setView([50.842369, 4.3226], 15);
        this.map.on('click', onMapClick);
        
        // voeg een tile layer toe, met URL https://a.tile.openstreetmap.org/{z}/{x}/{y}.png
        // vergeet openstreetmap attributie niet
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);

        // gebruik de functie "loadMarkers" om de markers toe te voegen
        this.loadMarkers();
    },
    loadMarkers() {
        // fetch de data van opendata.brussels.be
        fetch("https://opendata.brussels.be/api/records/1.0/search/?dataset=wifi0").then((resp) => resp.json().then((data) => {
            console.log(data);
            data.records.forEach((record) => {
                this.markers.push(record.fields.wifigps)
                // console.log(record.fields.wifigps)
                // als er coordinaten beschikbaar zijn, kan je de addMarker functie gebruiken om een marker toe te voegen op de kaart
                this.addMarker(record.fields.wifigps[0], record.fields.wifigps[1])
            });
        }))
    },
    addMarker(lat, lon) {
        var marker =  L.marker([lat, lon]).addTo(this.map)
        // voeg een marker toe op lat, lon
    },
};

// app.init();

// function onMapClick(e) {
//     // alert("You clicked the map at " + e.latlng);
//     app.map.setView([e.latlng.lat, e.latlng.lng], 15)
// }