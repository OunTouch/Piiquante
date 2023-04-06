//appel à mongoose
const mongoose = require('mongoose');

/****REFAIRE LE MODELE DE DONNEES MONGOOSE ****/
//création d'un modèle de données mongoose
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: ["String<userId>"],
  userDisliked: ["String<userId>"],

});
/****REFAIRE LE MODELE DE DONNEES MONGOOSE ****/

//exportation du modèle de données
module.exports = mongoose.model('Sauce', sauceSchema);