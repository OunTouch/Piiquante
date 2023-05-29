
//appel au modèle mongoose de sauce
const Sauce = require('../models/Sauces');

//fonction de like d'une sauce

exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    // Si l'utilisateur like la sauce
    if (req.body.like == 1 && !sauce.usersLiked.includes(req.auth.userId)) {
      Sauce.updateOne(
        { _id: req.params.id },
        { $push: { usersLiked: req.auth.userId }, $inc: { likes: +1 } }
      )
        .then(() => {
          res.status(200).json({ message: 'Vous aimez cette sauce' });
        })
        .catch((error) => res.status(400).json({ error }));
    }

    // Si l'utilisateur dislike la sauce
    else if (
      req.body.like == -1 &&
      !sauce.usersDisliked.includes(req.auth.userId)
    ) {
      Sauce.updateOne(
        { _id: req.params.id },
        { $push: { usersDisliked: req.auth.userId }, $inc: { dislikes: +1 } }
      )
        .then(() => {
          res.status(200).json({ message: "Vous n'aimez pas cette sauce" });
        })
        .catch((error) => res.status(400).json({ error }));
    }

    // Si l'utilisateur retire son like/dislike
    else {
      if (sauce.usersLiked.includes(req.auth.userId)) {
        Sauce.updateOne(
          { _id: req.params.id },
          { $pull: { usersLiked: req.auth.userId }, $inc: { likes: -1 }})
          .then(() => {
            res.status(200).json({ message: 'like annulé!' });
          })
          .catch((error) => res.status(400).json({ error }));
      } else if (sauce.usersDisliked.includes(req.auth.userId)) {
        Sauce.updateOne(
          { _id: req.params.id },
          { $pull: { usersDisliked: req.auth.userId }, $inc: { dislikes: -1 }})
          .then(() => {
            res.status(200).json({ message: 'dislike annulé!' });
          })
          .catch((error) => res.status(400).json({ error }));
      }
    }
  });
};

