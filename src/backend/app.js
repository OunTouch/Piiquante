//appel au package express
const express = require('express');
const app = express();
//appel au routeur des sauces
const sauceRoutes = require('./routes/sauces');
//appel au routeur des utilisateurs
const userRoutes = require('./routes/user');
//spécification du path de notre serveur
const path = require('path');
//appel à la base de donées
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://OunTouch:CX0BO7OVrc79CKCY@cluster0.z1ozurv.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//utilisation du format json pour express
app.use(express.json())

//gestion du CORS
app.use((req, res, next) => {
  //accès à l'api depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*');
  //ajout des headers suivant aux requêtes
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //autorise l'envoi des requêtes avec les méthodes suivantes
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//appel du routeur des sauces
app.use('/api/sauces', sauceRoutes);
//appel du routeur des utilisateurs
app.use('/api/auth', userRoutes);
//gestion de la ressource image de manière statique
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;

