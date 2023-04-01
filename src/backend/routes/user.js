//appel au package express
const express = require('express');
//crétion du routeur
const router = express.Router();
//appel au contrôleur definissant les middlewares pour les utilisateurs
const userCtrl = require('../controllers/user');
//appel au middleware d'authentification
const auth = require('../middleware/auth');
//méthodes des middlewares utilisateurs
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;

console.log('test routes');

/*appeler auth devant les routes des sauces */