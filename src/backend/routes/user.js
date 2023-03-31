//appel au package express
const express = require('express');
//crétion du routeur
const router = express.Router();
//appel au contrôleur definissant les middlewares pour les utilisateurs
const userCtrl = require('../controllers/user');
//méthodes des middlewares utilisateurs
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;

console.log('test routes');