/* Recup URL ID */

const recup = window.location.search.split("?id=").join("")
console.log(recup)

/* Create Element */
let url = 'http://195.14.105.123:1337'
fetch("http://195.14.105.123:1337/api/articles/" + recup + "?populate=*")
.then(function(res){
    if (res.ok) {
        return res.json();
}
})     .then(function(value){
     console.log(value);

        let eltConteneur = document.querySelector('.conteneur')
        let eltArticle = document.createElement('article');
            
            eltConteneur.appendChild(eltArticle);
            eltArticle.classList.add('article-child');

            let eltTitre = document.querySelector('h2')
            eltTitre.innerText = value.data.attributes.Titre;
            eltTitre.classList.add('Titre');

            let eltImage = document.querySelector('.timage');
            eltImage.style.cssText += 'background:url(' +(url + value.data.attributes.ImageBack.data.attributes.url) + ') no-repeat;'
            eltImage.classList.add('image');

            let eltTitre2 = document.createElement('h2')
            eltArticle.appendChild(eltTitre2);
            eltTitre2.innerText = value.data.attributes.Titre2;
            eltTitre2.classList.add('Titre2');


            let eltTexte = document.createElement('p')
            eltArticle.appendChild(eltTexte);
            eltTexte.innerText = value.data.attributes.Texte;
            eltTexte.classList.add('Texte');

            let eltDiv = document.createElement('div')
            eltArticle.appendChild(eltDiv);
            eltDiv.classList.add('Div-avis');

            let eltImage2 = document.createElement('img');
            eltDiv.appendChild(eltImage2);
            eltImage2.src = url + value.data.attributes.Image2.data.attributes.url;
            eltImage2.classList.add('image2');

            let eltTexte2 = document.createElement('p')
            eltDiv.appendChild(eltTexte2);
            eltTexte2.innerText = value.data.attributes.Texte;
            eltTexte2.classList.add('Texte2');
       

    })
    .catch(function (err) {

    });