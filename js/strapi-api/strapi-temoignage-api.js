url = 'http://195.14.105.123:1337'


/* Formulaire avis */


/*temoignage */

fetch("http://195.14.105.123:1337/api/articles?populate=*")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {
                                  
        let eltConteneur = document.querySelector('.conteneur-temoignage')   
        for (let article of value.data)
        {   
            let eltArticle = document.createElement('article');
            eltConteneur.appendChild(eltArticle);
            eltArticle.classList.add('article-child');
             //console.log(article);

            let articleId = article.id
            let eltLien = document.createElement('a')
            eltArticle.appendChild(eltLien)
            eltLien.classList.add('lien')
            eltLien.href = 'temoignage-page-generate.html?id='+ articleId

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
    for (let avis of value.data)
    {   
        let eltArticle = document.createElement('article');
        eltConteneur.appendChild(eltArticle);
        eltArticle.classList.add('avis-child');
        console.log(avis);

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

        let eltTitre2 = document.createElement('h5')
        eltArticle.appendChild(eltTitre2);
        eltTitre2.innerText = avis.attributes.Titre2;
        eltTitre2.classList.add('Avis-titre2');

        let eltTexte = document.createElement('p')
        eltArticle.appendChild(eltTexte);
        eltTexte.innerText = avis.attributes.Avis;
        eltTexte.classList.add('Texte-Avis');
       
        let eltBas = document.createElement('div');
        eltArticle.appendChild(eltBas);
        eltBas.classList.add('bas');   
        
        let eltBasLeft = document.createElement('p');
        eltBas.appendChild(eltBasLeft);
        eltBasLeft.innerText = '0 réponse';
        eltBasLeft.classList.add('bas-left');

        let eltBasRight = document.createElement('p');
        eltBas.appendChild(eltBasRight);
        eltBasRight.innerText = 'LIRE';
        eltBasRight.classList.add('bas-right');

    }

})
.catch(function (err) {

});
