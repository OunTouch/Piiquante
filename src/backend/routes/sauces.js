//appel à express
const express = require('express');
//démarrage du routeur via express
const router = express.Router();
//appel au middleware d'authentification
const auth = require('../middleware/auth');
//appel au gestionnaire des fichiers multer
const multer = require('../middleware/multer-config');
//appel au contrôleur des sauces
const sauceCtrl = require('../controllers/sauces');
//appel au contrôleur des likes
const like = require('../controllers/like');

//route pour afficher toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauces);

//route pour poster une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);

//route pour afficher une sauce
/****IMPLEMENTER AUTH ET MULTER ****/
router.get('/:id', auth, multer, sauceCtrl.getOneSauce);

//route pour modifier une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

//route pour supprimer une sauce
router.delete('/:id', auth, multer, sauceCtrl.deleteSauce);

//route pour liker une sauce
router.post('/:id/like', auth, like.likeSauce);

module.exports = router;