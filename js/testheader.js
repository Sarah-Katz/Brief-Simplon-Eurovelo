window.onscroll = function() {myFunction()};

function myFunction() {
  if (document.documentElement.scrollTop != 0) {
    document.getElementById("header").className = "cache";
    document.getElementById("lien").className = "cache";
  } else {
    document.getElementById("header").className = "";
    document.getElementById("lien").className = "";
  }
}

function afficher(){
   document.getElementById("recherche").className = "afficher";
   document.getElementById("croix").className = "afficher";
   document.getElementById("loupe").className = "afficher";
}

function desafficher(){
   document.getElementById("recherche").className = "";
   document.getElementById("croix").className = "";
   document.getElementById("loupe").className = "";
}