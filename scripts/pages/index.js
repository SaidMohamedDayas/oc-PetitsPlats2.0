// Importer le tableau de recettes
import { recipes } from "../data/recipes.js";
import "../utils/search.js";
import "../utils/tags.js";
import { RecipeCardFactory } from "../factories/RecipeCardFactory.js";

// Gestion de l'affichage du loader
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const main = document.querySelector("main");
  const header = document.querySelector("header");
  const loaderLogo = document.getElementById("loaderLogo");

  header.style.display = "none";
  main.style.display = "none";
  loader.style.display = "block";
  loaderLogo.style.display = "block";

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.style.display = "none";
      loaderLogo.style.display = "none";
      header.style.display = "block";
      main.style.display = "block";
    }, 1000);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Création des cartes de recettes et affichage du nombre total de recettes au chargement de la page
  const recipeFactory = new RecipeCardFactory(recipes);
  recipeFactory.createRecipeCards();
  recipeFactory.displayTotalRecipeCount();

  // Gestion de l'animation du bouton de recherche
  const searchIcon = document.querySelector(".searchIcon");
  searchIcon.addEventListener("mouseover", function () {
    fetch(searchIcon.src)
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(data, "image/svg+xml");
        const svgElement = svgDoc.querySelector("svg");

        svgElement.querySelector("rect").setAttribute("fill", "#ffd15b");
        svgElement.querySelector("circle").setAttribute("stroke", "black");
        svgElement.querySelector("line").setAttribute("stroke", "black");
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], {
          type: "image/svg+xml;charset=utf-8",
        });
        const svgUrl = URL.createObjectURL(svgBlob);

        searchIcon.src = svgUrl;
      });
  });

  searchIcon.addEventListener("mouseout", function () {
    searchIcon.src = "./images/search.svg";
  });
});
