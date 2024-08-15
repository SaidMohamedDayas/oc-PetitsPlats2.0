// Importer le tableau de recettes
import { recipes } from "../data/recipes.js";
import "../utils/search.js";
import "../utils/tags.js";

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

// Création de la classe RecipeCardFactory pour générer les cartes de recettes
class RecipeCardFactory {
  constructor(recipes) {
    this.recipes = recipes;
    this.recipesContainer = document.getElementById("containerRecipes");
  }

  // Méthode pour créer une carte de recette
  createRecipeCard(recipe) {
    return `<article class="card">
              <figure>
                <img src="./images/recipes/${recipe.image}" alt="${
      recipe.name
    }">
                <span class="timer">${recipe.time} min</span>
                <figcaption class="recette">
                        <h3>${recipe.name}</h3>
                        <h4>RECETTE</h4>
                        <p class="recetteDescription">${recipe.description}</p>
                        <h5 class="listIngredients">INGRÉDIENTS</h5>
                        <dl class="ingredient">
                        ${recipe.ingredients
                          .map((ingredient) => {
                            return `
                          <div>
                          <dd class="ingredientNom">${
                            ingredient.ingredient
                          }</dd>
                          <dt class="unite">${ingredient.quantity || ``} ${
                              ingredient.unit || ``
                            }</dt>
                          </div>`;
                          })
                          .join("")}</dl>
                </figcaption>
              </figure>
            </article>
            `;
  }

  // Méthode pour créer les cartes de recette à partir d'un tableau de recettes
  createRecipeCards() {
    this.recipes.forEach((recipe) => {
      const card = this.createRecipeCard(recipe);
      const range = document.createRange();
      range.selectNodeContents(this.recipesContainer);
      const container = range.createContextualFragment(card);
      this.recipesContainer.appendChild(container);
    });
  }

  // Méthode pour afficher le nombre total de recettes
  displayTotalRecipeCount() {
    const totalRecipeCount = document.createElement("div");
    totalRecipeCount.classList.add("totalRecettes");
    totalRecipeCount.textContent = `${this.recipes.length} recettes`;

    const filterContainer = document.getElementById("containerFilter");
    filterContainer.appendChild(totalRecipeCount);
  }
}

export { RecipeCardFactory };

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
