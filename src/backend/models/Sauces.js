//appel à mongoose
const mongoose = require('mongoose');

/****REFAIRE LE MODELE DE DONNEES MONGOOSE ****/
//création d'un modèle de données mongoose
const sauceSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});
/****REFAIRE LE MODELE DE DONNEES MONGOOSE ****/

//exportation du modèle de données
module.exports = mongoose.model('Sauce', sauceSchema);