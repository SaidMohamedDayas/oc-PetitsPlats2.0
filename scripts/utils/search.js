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

  filteredRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const recipeTitle = recipe.name.toLowerCase();
    const recipeIngredients = getRecipeIngredients(recipe);
    const recipeDescription = recipe.description.toLowerCase();

    let matchFound = false;

    // Vérifier la correspondance dans le titre
    if (recipeTitle.includes(searchValue)) {
      matchFound = true;
    }

    // Vérifier la correspondance dans les ingrédients si aucune correspondance trouvée dans le titre
    if (!matchFound) {
      for (let j = 0; j < recipeIngredients.length; j++) {
        if (recipeIngredients[j].includes(searchValue)) {
          matchFound = true;
          break;
        }
      }
    }

    // Vérifier la correspondance dans la description si aucune correspondance trouvée dans le titre ou les ingrédients
    if (!matchFound && recipeDescription.includes(searchValue)) {
      matchFound = true;
    }

    // Si une correspondance est trouvée, ajouter la recette aux recettes filtrées
    if (matchFound) {
      filteredRecipes.push(recipe);
    }
  }

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
  const ingredientsList = [];
  for (let i = 0; i < recipe.ingredients.length; i++) {
    ingredientsList.push(recipe.ingredients[i].ingredient.toLowerCase());
  }
  return ingredientsList;
}
