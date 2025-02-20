import { recipes } from "../data/recipes.js";
import { RecipeCardFactory } from "../factories/RecipeCardFactory.js";
import { updateTags, selectedTags } from "./tags.js";

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
  const searchValue = searchInput.value.trim().toLowerCase();

  // Filtrage par recherche principale
  filteredRecipes = recipes.filter((recipe) => {
    const recipeTitle = recipe.name.toLowerCase();
    const recipeIngredients = getRecipeIngredients(recipe);
    const recipeDescription = recipe.description.toLowerCase();

    return (
      recipeTitle.includes(searchValue) ||
      recipeIngredients.some((ingredient) =>
        ingredient.includes(searchValue)
      ) ||
      recipeDescription.includes(searchValue)
    );
  });

  // Appliquer aussi les filtres de tags
  filteredRecipes = filteredRecipes.filter((recipe) => {
    const recipeIngredients = getRecipeIngredients(recipe);
    const recipeAppliance = recipe.appliance.toLowerCase();
    const recipeUstensils = recipe.ustensils.map((ustensil) =>
      ustensil.toLowerCase()
    );

    return (
      selectedTags.ingredients.every((tag) =>
        recipeIngredients.includes(tag.toLowerCase())
      ) &&
      selectedTags.appliances.every((tag) =>
        recipeAppliance.includes(tag.toLowerCase())
      ) &&
      selectedTags.ustensils.every((tag) =>
        recipeUstensils.includes(tag.toLowerCase())
      )
    );
  });

  // Mise à jour de l'affichage des recettes
  updateRecipeDisplay(filteredRecipes);
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

  // Mettre à jour les tags en fonction des recettes filtrées
  updateTags(filteredRecipes);
}

// Fonction pour récupérer les ingrédients des recettes
export function getRecipeIngredients(recipe) {
  return recipe.ingredients.map((ingredient) =>
    ingredient.ingredient.toLowerCase()
  );
}
