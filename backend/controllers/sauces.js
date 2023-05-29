//appel au modèle mongoose de sauce
const Sauce = require('../models/Sauces');
//appel au package file system
const fs = require('fs');

//création de la fonction de création d'une sauce
exports.createSauce = (req, res, next) => {
    //conversion de la requête en objet
    const sauceObject = JSON.parse(req.body.sauce);
    //suppression des id envoyés par le client
    delete sauceObject._id;
    delete sauceObject._userId;
    //création de l'objet sauce avec le modèle mongoose
    const sauce = new Sauce({
        ...sauceObject,
        //authentification via le token
        userId: req.auth.userId,
        //reconstruction de l'url de l'image
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    //enregistrement de la sauce
    sauce.save()
    .then(() => { res.status(201).json({message: 'Sauce enregistrée !'})})
    .catch(error => { res.status(400).json( { error })})
};

//fonction de modification d'une sauce
exports.modifySauce = (req, res, next) => {
    // Vérification si un fichier est attaché à la requête
    const sauceObject = req.file ? {
      // Traitement de la nouvelle image
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    // Remplacement de l'id client par l'id d'authentification
    delete sauceObject._userId;
  
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        // Vérification si les ids ne correspondent pas
        if (sauce.userId != req.auth.userId) {
          res.status(403).json({ message: 'Not authorized' });
        } else {
          // Suppression de l'ancienne image si une nouvelle image est fournie
          if (req.file) {
            const filename = sauce.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, (error) => {
              if (error) {
                console.log('Erreur lors de la suppression de l\'image :', error);
              }
            });
          }
  
          // Mise à jour de l'image
          Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
            .catch(error => res.status(401).json({ error }));
        }
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  };
//création de la fonction de suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    //accès à la sauce correspondante grâce à l'id
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            //correspondance entre l'id de l'image et l'id de son propriétaire
            if (sauce.userId != req.auth.userId) {
                res.status(403).json({message: 'Not authorized'});
            } else {
                //récupération du nom du fichier
                const filename = sauce.imageUrl.split('/images/')[1];
                //suppression du fichier
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Sauce supprimée !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };


 //création de la fonction d'affichage d'une sauce
exports.getOneSauce = (req, res, next) => {
    //récupération de la sauce grâce à son id
    Sauce.findOne({_id: req.params.id})
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json ({ error }));
  };

//création de la fonction d'affichage de toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json ({ error }));
    };

  