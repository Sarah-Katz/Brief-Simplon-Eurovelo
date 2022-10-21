let url = 'http://195.14.105.123:1337'


/* actu */

fetch("http://195.14.105.123:1337/api/news?populate=*")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {
                                  
        let eltConteneur = document.querySelector('.conteneur')   
        for (let actu of value.data)
        {   
            let eltArticle = document.createElement('article');
            eltConteneur.appendChild(eltArticle);
            eltArticle.classList.add('article-child');
             //console.log(article);

            let articleId = actu.id
            let eltLien = document.createElement('a')
            eltArticle.appendChild(eltLien)
            eltLien.classList.add('lien')
            eltLien.href = 'temoignage-page-generate.html?id='+ articleId
      
            let eltTitre = document.createElement('h4')
            eltLien.appendChild(eltTitre);
            eltTitre.innerText = actu.attributes.Titre1;
            eltTitre.classList.add('Titre');

            let eltImage = document.createElement('img');
            eltLien.appendChild(eltImage);
            eltImage.src = url + actu.attributes.Image1.data.attributes.url;
            console.log(eltImage)
            eltImage.classList.add('image');


        }

    })
    .catch(function (err) {

    });