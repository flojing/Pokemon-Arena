const express = require("express");
const path = require("node:path");
const app = express();

// Servir les fichiers statiques du build du client
app.use(express.static(path.join(__dirname, "../client/dist")));

// Pour toutes les autres requêtes, renvoyer index.html (pour le routing React)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {});
