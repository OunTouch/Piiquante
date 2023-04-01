//appel au modèle mongoose de sauce
const Sauce = require('../models/Sauces');
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

/*
exports.modifyThing = (req, res, next) => {
    Thing.updateOne({_id: req.params.id}, { ...req.body, _id: req.params.id})
      .then(() => res.status(200).json({ message: 'Objet modifié' }))
      .catch(error => res.status(400).json ({ error }));
  };

exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({_id: req.params.id})
      .then(() => res.status(200).json({ message : 'Objet supprimé'}))
      .catch(error => res.status(404).json({ error }));
  };

exports.getOneThing = (req, res, next) => {
    Thing.findOne({_id: req.params.id})
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json ({ error }));
  };

exports.getAllThings = (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json ({ error }));
    };

    */