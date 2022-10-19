// Déclaration carte
var map = L.map('map').setView([50.8, 2.6], 9);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Déclaration variables

let mouseoverToggle = true
let mouseoutToggle = true
let lastTrackClicked = null
let titreEtape = document.getElementById("titreEtape")
let texteEtape = document.getElementById("texteEtape")
let montee = document.getElementById("montee")
let descente = document.getElementById("descente")
let distance = document.getElementById("distance")
let gpxDownload = document.getElementById("gpsDownload")
let image = document.getElementById("img")

// Chargement des fichiers
fetch("http://195.14.105.123:1337/api/etapes?populate=*")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {
        let etapes = value.data
        carte(etapes)
        console.log(etapes)
    })
    .catch(function (err) {
        //Une erreur est survenue
    });



function carte(etapes) {
    for (let etape of etapes) {
        new L.GPX(etape.attributes.url, {
            async: true, marker_options: {
                startIconUrl: 'images/carte/wpt.png',
                endIconUrl: 'images/carte/wpt.png',
                shadowUrl: 'images/carte/pin-shadow.png',
            },
            etape: etape,
            gpx_options: {
                joinTrackSegments: false
            }, polyline_options: {
                color: '#C04300',
                opacity: 1,
                weight: 9,
                lineCap: 'round'
            },
        }).addTo(map).on('click', function (e) {
            map.fitBounds(e.target.getBounds());
            e.target.setStyle({
                color: 'blue'
            })
            mouseoverToggle = false
            mouseoutToggle = false
            if (lastTrackClicked != null) {
                lastTrackClicked.setStyle({ color: '#C04300' })
            }
            lastTrackClicked = e.target
            titreEtape.innerHTML = e.target.options.etape.attributes.name;
            texteEtape.innerHTML = e.target.options.etape.attributes.texteEtape;
            distance.innerHTML = e.target.options.etape.attributes.distance;
            montee.innerHTML = e.target.options.etape.attributes.montee;
            descente.innerHTML = e.target.options.etape.attributes.descente;
            image.src = e.target.options.etape.attributes.img;
            gpxDownload.href = e.target.options.etape.attributes.url
        }).on('mouseover mousemove', function (e) {
            if (mouseoverToggle == true) {
                this.setStyle({
                    color: '#00246B'
                }); L.popup()
                    .setLatLng(e.latlng)
                    .setContent(e.target.options.etape.attributes.name)
                    .openOn(map)
            }
        }).on('mouseout', function () {
            if (mouseoutToggle == true) {
                map.closePopup();
                this.setStyle({
                    color: '#C04300'
                })
            }
            const bouton = document.getElementById("bouton");
            bouton.addEventListener('click', function () {
                map.setView([50.79067, 2.24964], 9);
                mouseoutToggle = true;
                mouseoverToggle = true;
                lastTrackClicked.setStyle({ color: '#C04300' })
                reset()
            });
        })
    }
}

function reset() {
    titreEtape.innerHTML = "Eurovélo - Hauts de france"
    distance.innerHTML = "217,4km"
    montee.innerHTML = "1090m"
    descente.innerHTML = "1071m"
    texteEtape.innerHTML = "texte descriptif de l'étape générale"
    image.innerHTML = "" //source image
    gpxDownload.innerHTML = ""
}