//appel au package mongoose
const mongoose = require('mongoose');
//création d'un modèle de données mongoose utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
