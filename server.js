const express = require("express");
const path = require("node:path");
const fs = require("node:fs");
const app = express();

// Détection du chemin du build client
const possiblePaths = [
  path.join(__dirname, "client/dist"),
  path.join(__dirname, "/client/dist"),
  path.join(__dirname, "./client/dist"),
  path.join(__dirname, "../client/dist"),
  path.join(process.cwd(), "client/dist"),
];

// Trouver le premier chemin valide
let clientPath = null;
for (const p of possiblePaths) {
  try {
    if (fs.existsSync(path.join(p, "index.html"))) {
      clientPath = p;
      break;
    }
  } catch (error) {}
}

if (!clientPath) {
  try {
    const contents = fs.readdirSync(__dirname);

    // Vérifier également le contenu du dossier client s'il existe
    if (fs.existsSync(path.join(__dirname, "client"))) {
      const clientContents = fs.readdirSync(path.join(__dirname, "client"));
    }
  } catch (error) {
    console.error(`Erreur lors de la lecture du répertoire: ${error}`);
  }
}

// Servir les fichiers statiques du build du client s'il est trouvé
if (clientPath) {
  app.use(express.static(clientPath));

  // Pour toutes les autres requêtes, renvoyer index.html (pour le routing React)
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
} else {
  // Réponse d'erreur si le dossier client n'est pas trouvé
  app.get("*", (req, res) => {
    res
      .status(500)
      .send(
        "Erreur de configuration: Impossible de trouver les fichiers client",
      );
  });
}

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {});
