const recettes = [];

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("assets/data/recette.json");
    const data = await res.json();
    console.log("Les datas sont bien chargées", data);

    // là je rejoute les recettes dans le tableau
    recettes.push(...data.recipes);

    // la on appel la fonction pour afficher les recettes
    affichageRecettes(recettes);

    // je fais un listener pour "écouter" chaque frappe
    const champDeRecherche = document.getElementById("searchInput");

    champDeRecherche.addEventListener("input", (event) => {
      const valeur = event.target.value.toLowerCase();

      // là je fais un filtre pour qu'il me garde les correspondance avec ce que je tape
      const recettesFilter = recettes.filter((r) => {
        return r.name.toLowerCase().includes(valeur);
      });

      affichageRecettes(recettesFilter);
    });
  } catch (error) {
    console.error("Erreur lors du chargement", error);
  }
});

function affichageRecettes(recettes) {
  // selection du conteneur
  const conteneur = document.getElementById("recipesContainer");
  conteneur.innerHTML = ""; // On vide le conteneur avant d'ajouter

  recettes.forEach((recette) => {
    // je crée un article
    const article = document.createElement("article");
    article.className = "recipe-card";

    // titre = nom de la recette
    const titre = document.createElement("h2");
    titre.textContent = recette.name;
    article.appendChild(titre);

    // nombres de personnes
    const personnes = document.createElement("p");
    personnes.textContent = `nombres de personnes ${recette.servings}`;
    article.appendChild(personnes);

    // ingredients liste
    const liste = document.createElement("ul");
    recette.ingredients.forEach((element) => {
      const li = document.createElement("li");

      if (element.quantity) {
        if (element.unit) {
          // Cas avec unité
          li.textContent = `${element.quantity} ${element.unit} de ${element.ingredient}`;
        } else {
          // Cas sans unité
          li.textContent = `${element.quantity} ${element.ingredient}`;
        }
      } else {
        // Cas sans quantité
        li.textContent = element.ingredient;
      }

      liste.appendChild(li);
    });

    // Ajout de la liste d'ingrédients à l'article
    article.appendChild(liste);

    //  on pourras ajouter d'autres éléments ici (ex: description, temps, etc.)
    // voilà, c'est ici que l'on écoute qaund on click sur le card element

    article.addEventListener("click", () => {
      afficherPopup(recette);
    });

    // Ajout de l'article au conteneur
    conteneur.appendChild(article);
  });
}

function afficherPopup(recette) {
  //Sélection des éléments du popup qui sont dans le html

  const popup = document.getElementById("popup");
  const title = document.getElementById("popupTitle");
  const time = document.getElementById("popupTime");
  const description = document.getElementById("popupDescription");
  const appliance = document.getElementById("popupAppliance");
  const ustensils = document.getElementById("popupUstensils");

  // maintenant je rempli le popup avec les elements de recette

  title.textContent = recette.name;
  time.textContent = recette.time;
  description.textContent = recette.description;
  appliance.textContent = recette.appliance;
  ustensils.textContent = recette.ustensils.join(", ");

  // 3. Afficher le popup (on enlève la classe hidden)
  popup.classList.remove("hidden");
}

// et la enfin c'est pour fermer et la du coup on rajoute la classe hidden se qui cache le pop-up
document.getElementById("closeBtn").addEventListener("click", () => {
  document.getElementById("popup").classList.add("hidden");
});
