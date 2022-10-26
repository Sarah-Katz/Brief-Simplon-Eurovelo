url = 'http://195.14.105.123:1337'

/* date */
var d = new Date();
var dateToday = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear()
var hours = d.getHours() + ":" + d.getMinutes();
var fullDate = dateToday+' - '+hours;

/* Formulaire avis  */
const form = document.getElementById('form');
let Titre = document.getElementById('Titre')
let Personne = document.getElementById('Personne')
let Titre2 = document.getElementById('Titre2')
let Avis = document.getElementById('Avis')
let date = document.getElementById('date')

form.addEventListener('submit', function (e) {
    e.preventDefault();

    fetch("http://195.14.105.123:1337/api/avis", {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({
            "data": {
                'Titre': Titre.value,
                'Personne': Personne.value,
                'Avis': Avis.value,
                'date': fullDate,
            }
        })
    }
    )
        .then(res => res.json())
        .then(function (data) {
            console.log('toto');
            alert('Merci ' + Personne.value + ' de votre avis')
            window.location.reload()
        })
        .then(err => console.log(err))

}) 




/*temoignage */

fetch("http://195.14.105.123:1337/api/articles?populate=*")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {

        let eltConteneur = document.querySelector('.conteneur-temoignage')
        for (let article of value.data) {
            let eltArticle = document.createElement('article');
            eltConteneur.appendChild(eltArticle);
            eltArticle.classList.add('article-child');
            //console.log(article);

            let articleId = article.id
            let eltLien = document.createElement('a')
            eltArticle.appendChild(eltLien)
            eltLien.classList.add('lien')
            eltLien.href = 'temoignage-page-generate.html?id=' + articleId

            let eltImage = document.createElement('img');
            eltLien.appendChild(eltImage);
            eltImage.src = url + article.attributes.Image.data.attributes.url;
            // console.log(eltImage)
            eltImage.classList.add('image');

            let eltTitre = document.createElement('h4')
            eltLien.appendChild(eltTitre);
            eltTitre.innerText = article.attributes.Titre;
            eltTitre.classList.add('Titre');

        }

    })
    .catch(function (err) {

    });

/*avis*/

fetch("http://195.14.105.123:1337/api/avis?populate=*")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {

        let eltConteneur = document.querySelector('.conteneur-avis')
        for (let avis of value.data) {
            let eltArticle = document.createElement('article');
            eltConteneur.appendChild(eltArticle);
            eltArticle.classList.add('avis-child');

            let eltDate = document.createElement('p')
            eltArticle.appendChild(eltDate);
            eltDate.innerText = avis.attributes.date;
            eltDate.classList.add('date');

            let eltTitreAvis = document.createElement('h5')
            eltArticle.appendChild(eltTitreAvis);
            eltTitreAvis.innerText = avis.attributes.Titre;
            eltTitreAvis.classList.add('Avis-titre');

            let eltPersonne = document.createElement('p')
            eltArticle.appendChild(eltPersonne);
            eltPersonne.innerText = avis.attributes.Personne;
            eltPersonne.classList.add('personne');

            let eltTexte = document.createElement('p')
            eltArticle.appendChild(eltTexte);
            eltTexte.innerText = avis.attributes.Avis;
            eltTexte.classList.add('Texte-Avis');
        }

    })
    .catch(function (err) {

    });


