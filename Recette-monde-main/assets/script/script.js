// Fonction pour charger et afficher les recettes depuis le JSON
document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/recette.json")
    .then((response) => response.json())
    .then((data) => afficherRecettes(data.recipes))
    .catch((error) =>
      console.error("Erreur lors du chargement des recettes :", error)
    );
});

function afficherRecettes(recettes) {
  const container = document.getElementById("recipesContainer");
  container.innerHTML = "";
  recettes.forEach((recette) => {
    const article = document.createElement("article");
    article.className = "recipe-card";
    
    article.innerHTML = `
      <h2>${recette.name}</h2>
      <p><strong>Nombre de personnes :</strong> ${recette.servings}</p>
      <ul>
        ${recette.ingredients
          .map(
            (ing) =>
              `<li>${
                ing.quantity
                  ? ing.quantity + (ing.unit ? " " + ing.unit : "") + " de "
                  : ""
              }${ing.ingredient}</li>`
          )
          .join("")}
      </ul>
    `;
    container.appendChild(article);
  });
}
