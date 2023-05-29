//appel au package mongoose
const mongoose = require('mongoose');

//mise en place d'une vérification de la validité de l'email
const emailValidator = require('../middleware/emailController');

//mise en place d'une vérification de la complexité du password
const passwordValidator = require('../middleware/passwordController');

//création d'un modèle de données mongoose utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});



module.exports = mongoose.model('User', userSchema);
