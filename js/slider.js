
/* strapi carrousels  Début */
 let url = 'http://195.14.105.123:1337'

 fetch("http://195.14.105.123:1337/api/carrousels?populate=*")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {
        let eltCarrousels = document.querySelector('.slider')

        for (let slide of value.data) {

             let eltCarrousel = document.createElement('div')
              eltCarrousels.appendChild(eltCarrousel)
              eltCarrousel.classList.add('slide')         
              eltCarrousel.style.cssText = 'background: url( ' + url + slide.attributes.Image.data.attributes.url + ' ) no-repeat center top/cover ';  
              eltCarrousels.firstElementChild.classList.add('current')
              
              
              let eltTitre = document.createElement('h2')
              eltCarrousel.appendChild(eltTitre)
              eltTitre.innerHTML = 'Eurovélo 5'

              let titreBr = document.createElement('br')
              eltTitre.appendChild(titreBr)

              let titreSpan = document.createElement('span')
              eltTitre.appendChild(titreSpan)
              titreSpan.innerHTML = 'Hauts-de-France'

        }

    })
    .catch(function (err) {

    }); 

/* strapi carrousels  Fin */

/* Carrousel */

const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const auto = true; // Auto scroll
const intervalTime = 4000;
let slideInterval;
let eltCarrouselSelect = document.querySelector('.slider')

const nextSlide = () => {
  // recuperer la class current
  const current = document.querySelector('.current');
  // Retirer la class current
  current.classList.remove('current');
  // Vérifier la diapo suivante
  if (current.nextElementSibling) {
    // Ajouter current à la prochaine diapo
    current.nextElementSibling.classList.add('current');
  } else {
    // Ajouter current au début
    eltCarrouselSelect.firstElementChild.classList.add('current');
  }
  setTimeout(() => current.classList.remove('current'));
};

const prevSlide = () => {
  // recuperer la class current
  const current = document.querySelector('.current');
  // Retirer la class current
  current.classList.remove('current');
  // Vérifier la diapo précédente
  if (current.previousElementSibling) {
    // Ajouter current à la diapo précédente
    current.previousElementSibling.classList.add('current');
  } else {
    // Ajouter current à la fin
    eltCarrouselSelect.lastElementChild.classList.add('current');
  }
  setTimeout(() => current.classList.remove('current'));
};

// les bouttons
next.addEventListener('click', e => {
  nextSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

prev.addEventListener('click', e => {
  prevSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

// Auto slide
if (auto) {
  // temps entre les slides
  slideInterval = setInterval(nextSlide, intervalTime);
}

