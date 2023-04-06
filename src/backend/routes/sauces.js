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

//route pour afficher toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauces);

//route pour poster une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);
/*
//route pour afficher une sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);
*/
//route pour modifier une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
/*
//route pour supprimer une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);
*/


module.exports = router;