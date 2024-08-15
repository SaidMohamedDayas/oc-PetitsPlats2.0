import { recipes } from "../data/recipes.js";
import { getRecipeIngredients, updateRecipeDisplay } from "./search.js";

// Tableaux pour les filtres
let allIngredients = [];
let allAppliances = [];
let allUstensils = [];
let selectedTags = {
  ingredients: [],
  appliances: [],
  ustensils: [],
};

// Récupérer le conteneur des recettes
const recipesContainer = document.getElementById("containerFilter");
const filterContainer = document.getElementById("containerRecipes");

// Affichage des tags de filtre au clic
const tags = document.querySelectorAll(".btnFilter .titleFilter");
tags.forEach((tag) => {
  tag.addEventListener("click", (event) => {
    event.preventDefault();
    const filterTag = tag.parentNode;
    filterTag.classList.toggle("open");
  });
});

// Normaliser les résultats
function normalizeResult(result) {
  return result.map((item) => item.toLowerCase());
}

// Fonction pour ajouter des événements de clic aux éléments filtrés
function addClickEventToTags(tags, type) {
  tags.forEach((tag) => {
    tag.addEventListener("click", (event) => {
      event.preventDefault();
      const tagValue = tag.textContent;
      if (!selectedTags[type].includes(tagValue)) {
        selectedTags[type].push(tagValue);
        createTagButton(tagValue, type);
        tag.classList.add("selecteFilterTag");
        updateFilteredRecipes();
      }
    });
  });
}

//////////////////////////////////////// AFFICHAGE INGREDIENTS ////////////////////////////////////////

export function displayIngredients(ingredients) {
  // Normaliser les ingrédients
  ingredients = normalizeResult(ingredients);
  // Supprimer les doublons
  ingredients = [...new Set(ingredients)];
  // Trier les ingrédients par ordre alphabétique
  ingredients.sort();

  // Récupérer le filtre ingrédients
  const ingredientsFilter = document.getElementById("filterIngredients");
  // Affichage des ingrédients dans le filtre
  const ingredientsList = document.createElement("ul");
  ingredientsList.classList.add("filterList");

  // Ajouter les tags sélectionnés en haut de la liste
  selectedTags.ingredients.forEach((ingredient) => {
    const ingredientItem = document.createElement("li");
    ingredientItem.textContent = ingredient;
    ingredientItem.classList.add("selecteFilterTag");
    ingredientsList.appendChild(ingredientItem);
  });

  // Ajouter les autres ingrédients
  ingredients.forEach((ingredient) => {
    if (!selectedTags.ingredients.includes(ingredient)) {
      const ingredientItem = document.createElement("li");
      ingredientItem.textContent = ingredient;
      ingredientsList.appendChild(ingredientItem);
    }
  });
  ingredientsFilter.appendChild(ingredientsList);
  addClickEventToTags(
    document.querySelectorAll("#filterIngredients li"),
    "ingredients"
  );

  // Recherche d'ingrédients dans la liste
  const searchIngredients = document.querySelectorAll(".searchFilter input")[0];

  searchIngredients.addEventListener("keyup", (event) => {
    const searchValue = searchIngredients.value
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();

    // Afficher les ingrédients correspondants à la recherche
    const filteredIngredients = ingredients.filter((ingredient) =>
      ingredient.toLowerCase().includes(searchValue)
    );

    // Supprimer les ingrédients de la liste
    ingredientsList.innerHTML = "";

    // Afficher les ingrédients filtrés
    selectedTags.ingredients.forEach((ingredient) => {
      const ingredientItem = document.createElement("li");
      ingredientItem.textContent = ingredient;
      ingredientItem.classList.add("selecteFilterTag");
      ingredientsList.appendChild(ingredientItem);
    });

    filteredIngredients.forEach((ingredient) => {
      const ingredientItem = document.createElement("li");
      ingredientItem.textContent = ingredient;
      ingredientsList.appendChild(ingredientItem);
    });
    addClickEventToTags(
      document.querySelectorAll("#filterIngredients li"),
      "ingredients"
    );
  });
}

// Récupérer la liste des tous les ingrédients du JSON
recipes.forEach((recipe) => {
  recipe.ingredients.forEach((ingredient) => {
    allIngredients.push(ingredient.ingredient);
  });
});

// Affichage initial des ingrédients
displayIngredients(allIngredients);

//////////////////////////////////////// AFFICHAGE APPLIANCES ////////////////////////////////////////

export function displayAppliances(appliances) {
  // Normaliser les appareils
  appliances = normalizeResult(appliances);
  // Supprimer les doublons
  appliances = [...new Set(appliances)];
  // Trier les appareils par ordre alphabétique
  appliances.sort();

  // Récupérer le filtre appareils
  const appliancesFilter = document.getElementById("filterAppliances");
  // Affichage des appareils dans le filtre
  const appliancesList = document.createElement("ul");
  appliancesList.classList.add("filterList");
  // Ajouter les tags sélectionnés en haut de la liste
  selectedTags.appliances.forEach((appliance) => {
    const applianceItem = document.createElement("li");
    applianceItem.textContent = appliance;
    applianceItem.classList.add("selecteFilterTag");
    appliancesList.appendChild(applianceItem);
  });

  // Ajouter les autres appareils
  appliances.forEach((appliance) => {
    if (!selectedTags.appliances.includes(appliance)) {
      const applianceItem = document.createElement("li");
      applianceItem.textContent = appliance;
      appliancesList.appendChild(applianceItem);
    }
  });
  appliancesFilter.appendChild(appliancesList);
  addClickEventToTags(
    document.querySelectorAll("#filterAppliances li"),
    "appliances"
  );

  // Recherche d'appareils dans la liste
  const searchAppliances = document.querySelectorAll(".searchFilter input")[1];

  searchAppliances.addEventListener("keyup", (event) => {
    const searchValue = searchAppliances.value
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();

    // Afficher les appareils correspondants à la recherche
    const filteredAppliances = appliances.filter((appliance) =>
      appliance.toLowerCase().includes(searchValue)
    );

    // Supprimer les appareils de la liste
    appliancesList.innerHTML = "";

    // Afficher les appareils filtrés
    selectedTags.appliances.forEach((appliance) => {
      const applianceItem = document.createElement("li");
      applianceItem.textContent = appliance;
      applianceItem.classList.add("selecteFilterTag");
      appliancesList.appendChild(applianceItem);
    });

    filteredAppliances.forEach((appliance) => {
      const applianceItem = document.createElement("li");
      applianceItem.textContent = appliance;
      appliancesList.appendChild(applianceItem);
    });
    addClickEventToTags(
      document.querySelectorAll("#filterAppliances li"),
      "appliances"
    );
  });
}

// Récupérer la liste des tous les appareils du JSON
recipes.forEach((recipe) => {
  allAppliances.push(recipe.appliance);
});

// Affichage initial des appareils
displayAppliances(allAppliances);

//////////////////////////////////////// AFFICHAGE USTENSILS ////////////////////////////////////////

export function displayUstensils(ustensils) {
  // Normaliser les ustensiles
  ustensils = normalizeResult(ustensils);
  // Supprimer les doublons
  ustensils = [...new Set(ustensils)];
  // Trier les ustensiles par ordre alphabétique
  ustensils.sort();

  // Récupérer le filtre ustensiles
  const ustensilsFilter = document.getElementById("filterUstensils");
  // Affichage des ustensiles dans le filtre
  const ustensilsList = document.createElement("ul");
  ustensilsList.classList.add("filterList");
  // Ajouter les tags sélectionnés en haut de la liste
  selectedTags.ustensils.forEach((ustensil) => {
    const ustensilItem = document.createElement("li");
    ustensilItem.textContent = ustensil;
    ustensilItem.classList.add("selecteFilterTag");
    ustensilsList.appendChild(ustensilItem);
  });

  // Ajouter les autres ustensiles
  ustensils.forEach((ustensil) => {
    if (!selectedTags.ustensils.includes(ustensil)) {
      const ustensilItem = document.createElement("li");
      ustensilItem.textContent = ustensil;
      ustensilsList.appendChild(ustensilItem);
    }
  });
  ustensilsFilter.appendChild(ustensilsList);
  addClickEventToTags(
    document.querySelectorAll("#filterUstensils li"),
    "ustensils"
  );

  // Recherche d'ustensiles dans la liste
  const searchUstensils = document.querySelectorAll(".searchFilter input")[2];

  searchUstensils.addEventListener("keyup", (event) => {
    const searchValue = searchUstensils.value
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();

    // Afficher les ustensiles correspondants à la recherche
    const filteredUstensils = ustensils.filter((ustensil) =>
      ustensil.toLowerCase().includes(searchValue)
    );

    // Supprimer les ustensiles de la liste
    ustensilsList.innerHTML = "";

    // Afficher les ustensiles filtrés
    selectedTags.ustensils.forEach((ustensil) => {
      const ustensilItem = document.createElement("li");
      ustensilItem.textContent = ustensil;
      ustensilItem.classList.add("selecteFilterTag");
      ustensilsList.appendChild(ustensilItem);
    });

    filteredUstensils.forEach((ustensil) => {
      const ustensilItem = document.createElement("li");
      ustensilItem.textContent = ustensil;
      ustensilsList.appendChild(ustensilItem);
    });
    addClickEventToTags(
      document.querySelectorAll("#filterUstensils li"),
      "ustensils"
    );
  });
}

// Récupérer la liste des toutes les ustensiles du JSON
recipes.forEach((recipe) => {
  recipe.ustensils.forEach((ustensil) => {
    allUstensils.push(ustensil);
  });
});

// Affichage initial des ustensiles
displayUstensils(allUstensils);

//////////////////////////////////////// MISE À JOUR DES TAGS ////////////////////////////////////////

export function updateTags(filteredRecipes) {
  let filteredIngredients = [];
  let filteredAppliances = [];
  let filteredUstensils = [];

  filteredRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      filteredIngredients.push(ingredient.ingredient);
    });
    filteredAppliances.push(recipe.appliance);
    recipe.ustensils.forEach((ustensil) => {
      filteredUstensils.push(ustensil);
    });
  });

  removeTags();

  displayIngredients(filteredIngredients);
  displayAppliances(filteredAppliances);
  displayUstensils(filteredUstensils);
}

// Filtrer les recettes au clic sur un tag
function updateFilteredRecipes() {
  let filteredRecipes = recipes.filter((recipe) => {
    const recipeIngredients = getRecipeIngredients(recipe).map((ingredient) =>
      ingredient.toLowerCase()
    );
    const recipeAppliance = recipe.appliance.toLowerCase();
    const recipeUstensils = recipe.ustensils.map((ustensil) =>
      ustensil.toLowerCase()
    );

    // Vider le filtre avant d'afficher les ingrédients
    removeTags();

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

  updateRecipeDisplay(filteredRecipes);
  updateTags(filteredRecipes);
  filterContainer.classList.remove("hide");
  recipesContainer.classList.remove("messageContainer");
}

function searchTagIngredientApplianceUstensil(tagValue) {
  if (
    !selectedTags.ingredients.includes(tagValue) &&
    !selectedTags.appliances.includes(tagValue) &&
    !selectedTags.ustensils.includes(tagValue)
  ) {
    let filteredRecipes = recipes.filter((recipe) => {
      const recipeIngredients = getRecipeIngredients(recipe);
      const recipeAppliance = recipe.appliance.toLowerCase();
      const recipeUstensils = recipe.ustensils.map((ustensil) =>
        ustensil.toLowerCase()
      );

      return (
        recipeIngredients.some((ingredient) =>
          ingredient.includes(tagValue.toLowerCase())
        ) ||
        recipeAppliance.includes(tagValue.toLowerCase()) ||
        recipeUstensils.some((ustensil) =>
          ustensil.includes(tagValue.toLowerCase())
        )
      );
    });

    updateRecipeDisplay(filteredRecipes);
    updateTags(filteredRecipes);
    filterContainer.classList.remove("hide");
    recipesContainer.classList.remove("messageContainer");
  }
}

const filterTags = document.querySelectorAll(".filterList li");
filterTags.forEach((tag) => {
  tag.addEventListener("click", (event) => {
    event.preventDefault();
    const tagValue = tag.textContent;
    searchTagIngredientApplianceUstensil(tagValue);
  });
});

// Fonction pour créer un bouton tag pour les ingrédients, appareils et ustensiles avec un événement de suppression
function createTagButton(tag, type) {
  const tagAside = document.getElementById("tag");
  const tagButton = document.createElement("button");
  tagButton.classList.add("selectedTag");
  tagButton.id = tag;

  const tagName = document.createElement("span");
  tagName.textContent = tag;
  tagName.classList.add("tagName");
  tagButton.appendChild(tagName);

  const closeIcon = document.createElement("i");
  closeIcon.classList.add("fas", "fa-times", "closeIcon");
  tagButton.appendChild(closeIcon);

  // insérer TagButton dans tagAside
  tagAside.appendChild(tagButton);

  closeIcon.addEventListener("click", (event) => {
    event.preventDefault();
    tagButton.remove();
    selectedTags[type] = selectedTags[type].filter(
      (selectedTag) => selectedTag !== tag
    );
    updateFilteredRecipes();
  });

  return tagButton;
}

// Fonction pour supprimer un tag
export function removeTags() {
  const tags = document.querySelectorAll(".filterList");
  tags.forEach((tag) => {
    tag.remove();
  });
}
