// Création carte
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
let gpxDownload = document.getElementById("gpxDownload")
let image = document.getElementById("img")
let url = 'http://195.14.105.123:1337'

// Chargement des données
fetch("http://195.14.105.123:1337/api/etapes?populate=*")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {
        let etapes = value.data
        carte(etapes)
        createButtonNext(etapes)
        // console.log(etapes)
    })
    .catch(function (err) {
        //Une erreur est survenue
    });

// Création des tracés et fonctions de clics
function carte(etapes) {
    for (let etape of etapes) {
        new L.GPX(url + etape.attributes.gpx.data.attributes.url, {
            async: true, marker_options: {
                startIconUrl: 'images/carte/wpt.png',
                iconSize: [25, 25],
                iconAnchor: [12, 12],
                shadowSize: [0, 0],
                endIconUrl: 'images/carte/wpt.png',
                shadowUrl: 'images/carte/pin-shadow.png',
            },
            etape: etape,
            polyline_options: {
                color: '#f59c00',
                opacity: 1,
                weight: 9,
                lineCap: 'round'
            },
        }).addTo(map)
            .on('click', function (e) {
                map.fitBounds(e.target.getBounds());
                e.target.setStyle({
                    color: 'blue'
                })
                mouseoverToggle = false
                mouseoutToggle = false
                if (lastTrackClicked != null) {
                    lastTrackClicked.setStyle({ color: '#f59c00' })
                }
                lastTrackClicked = e.target
                setArticle(e)
            }).on('mouseover mousemove', function (e) {
                if (mouseoverToggle == true) {
                    this.setStyle({
                        color: '#00246B'
                    }); L.popup()
                        .setLatLng(e.latlng)
                        .setContent(etape.attributes.name + "<br>" + etape.attributes.distance)
                        .openOn(map)
                }
            }).on('mouseout', function () {
                if (mouseoutToggle == true) {
                    map.closePopup();
                    this.setStyle({
                        color: '#f59c00'
                    })
                }
            });
    }
    const bouton = document.getElementById("bouton");
    bouton.addEventListener('click', function () {
        reset()
    })
}
// Modification de la fiche article
function setArticle(e) {
    titreEtape.innerHTML = e.target.options.etape.attributes.name;
    texteEtape.innerHTML = e.target.options.etape.attributes.texteEtape;
    distance.innerHTML = e.target.options.etape.attributes.distance;
    montee.innerHTML = e.target.options.etape.attributes.montee;
    descente.innerHTML = e.target.options.etape.attributes.descente;
    image.src = url + e.target.options.etape.attributes.img.data.attributes.url;
    gpxDownload.href = url + e.target.options.etape.attributes.gpx.data.attributes.url
}
// Retour au tracé complet
function reset() {
    map.setView([50.79067, 2.24964], 9);
    mouseoutToggle = true;
    mouseoverToggle = true;
    lastTrackClicked.setStyle({ color: '#f59c00' });
    titreEtape.innerHTML = "Eurovélo - Hauts de france";
    distance.innerHTML = "217,4km";
    montee.innerHTML = "1090m";
    descente.innerHTML = "1071m";
    texteEtape.innerHTML = "texte descriptif de l'étape générale";
    image.src = "images/etapes/imageetape9.jpg";
    gpxDownload.href = "js/fulltrack.gpx";
}


// Génération boutons précedents/suivant


function createButtonNext() {
    const download = document.getElementsByClassName(".download")
    console.log(download)
    const etapeSuivante = document.createElement("a");
    etapeSuivante.id = "etapeSuivante";
    etapeSuivante.href = url + e.target.options.etape.attributes.gpx.data.attributes.url;
    download.appendChild(etapeSuivante)
}







// function createButtonNext(e) {
//     const etapeSuivante = document.createElement("a");
//     etapeSuivante.id = "etapeSuivante";
//     etapeSuivante.href = url + e.target.options.etape.attributes.gpx.data.attributes.url;
//     document.body.insertBefore(etapeSuivante, gpxDownload);
// }