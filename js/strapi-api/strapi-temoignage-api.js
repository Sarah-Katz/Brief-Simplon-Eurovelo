let url = 'http://195.14.105.123:1337'
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
            console.log(article);

            let articleId = article.id
            let eltLien = document.createElement('a')
            eltArticle.appendChild(eltLien)
            eltLien.classList.add('lien')
            eltLien.href = 'temoignage-page-generate.html?id='+ articleId

            let eltImage = document.createElement('img');
            eltLien.appendChild(eltImage);
            eltImage.src = url + article.attributes.Image.data.attributes.url;
            console.log(eltImage)
            eltImage.classList.add('image');

            let eltTitre = document.createElement('h4')
            eltLien.appendChild(eltTitre);
            eltTitre.innerText = article.attributes.Titre;
            eltTitre.classList.add('Titre');

        }

    })
    .catch(function (err) {

    });