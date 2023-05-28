//appel au package express
const express = require('express');
//crétion du routeur
const router = express.Router();
//appel au contrôleur definissant les middlewares pour les utilisateurs
const userCtrl = require('../controllers/user');
//mise en place d'une vérification de la validité de l'email
const emailValidator = require('../middleware/emailController');

//mise en place d'une vérification de la complexité du password
const passwordValidator = require('../middleware/passwordController');
//méthodes des middlewares utilisateurs
router.post('/signup', emailValidator, passwordValidator, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;

