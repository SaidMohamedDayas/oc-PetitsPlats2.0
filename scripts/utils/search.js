import { recipes } from "../data/recipes.js";
import { RecipeCardFactory } from "../pages/index.js";
import { updateTags, removeTags } from "./tags.js";

let filteredRecipes = [];

// Ajout d'un écouteur d'événement sur le champ de recherche
const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector(".searchIcon");
const filterContainer = document.getElementById("containerFilter");
const recipesContainer = document.getElementById("containerRecipes");

searchButton.addEventListener("click", searchRecipe);
searchInput.addEventListener("keyup", (event) => {
  const searchValue = searchInput.value
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
  if (
    (searchValue !== "" && searchValue.length >= 3) ||
    (event.key === "Enter" && searchValue !== "" && searchValue.length >= 3) ||
    searchValue == ""
  ) {
    searchRecipe();
  }
});

// Fonction pour effectuer une recherche de recettes
function searchRecipe() {
  const searchValue = searchInput.value
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

  filteredRecipes = recipes.filter((recipe) => {
    const recipeTitle = recipe.name.toLowerCase();
    const recipeIngredients = getRecipeIngredients(recipe);
    const recipeDescription = recipe.description.toLowerCase();

    // Vérifier la correspondance dans le titre, les ingrédients ou la description
    if (
      recipeTitle.includes(searchValue) ||
      recipeIngredients.some((ingredient) =>
        ingredient.includes(searchValue)
      ) ||
      recipeDescription.includes(searchValue)
    ) {
      return true;
    }

    return false;
  });

  // Affichage des recettes filtrées
  if (filteredRecipes.length === 0) {
    recipesContainer.textContent = `Aucune recette ne contient '${searchValue}'. Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
    filterContainer.classList.add("hide");
    recipesContainer.classList.add("messageContainer");
  } else {
    updateRecipeDisplay(filteredRecipes);
    filterContainer.classList.remove("hide");
    recipesContainer.classList.remove("messageContainer");
  }
}

// Fonction pour la mise à jour de l'affichage des recettes filtrées
export function updateRecipeDisplay(filteredRecipes) {
  recipesContainer.innerHTML = "";
  const recipeFactory = new RecipeCardFactory(filteredRecipes);
  recipeFactory.createRecipeCards();
  const totalRecipeCount = document.querySelector(".totalRecettes");
  if (totalRecipeCount) {
    totalRecipeCount.textContent =
      filteredRecipes.length === 1
        ? "1 recette"
        : `${filteredRecipes.length} recettes`;
  }

  // Vider le filtre avant d'afficher les ingrédients
  removeTags();

  // Mettre à jour les tags en fonction des recettes filtrées
  updateTags(filteredRecipes);
}

// Fonction pour récupérer les ingrédients des recettes
export function getRecipeIngredients(recipe) {
  return recipe.ingredients.map((ingredient) =>
    ingredient.ingredient.toLowerCase()
  );
}
