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
