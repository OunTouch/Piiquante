//appel au modèle mongoose de sauce
const Sauce = require('../models/Sauces');

//fonction de like d'une sauce
exports.likeSauce = (req, res, next) => {
    //récupération des informations contenues dans la requête
    let like = req.body.like;
    let userId = req.body.userId;
    //récupération de la sauce correspondante dans la bdd
    const sauceId = req.params.id;
    Sauce.findOne({ _id: sauceId })
      .then((sauce) => {
        //création d'un objet contenant les nouvelles valeurs à modifier
        const newValues = {
          usersLiked: sauce.usersLiked,
          usersDisliked: sauce.usersDisliked,
          likes: 0,
          dislikes: 0,
        };
        //traitement des différents cas
        switch (like) {
            //cas de la sauce liké
            case 1: newValues.usersLiked.push(userId);
            break;
            //cas de la sauce disliké
            case -1: newValues.usersDisliked.push(userId);
            break;
            //cas de l'annulation de like/dislike
            case 0:
            if (newValues.usersLiked.includes(userId)) {
              //cas de l'annulation du like
              const index = newValues.usersLiked.indexOf(userId);
              newValues.usersLiked.splice(index, 1);
            } else {
              //cas de l'annulation du dislike
              const index = newValues.usersDisliked.indexOf(userId);
              newValues.usersDisliked.splice(index, 1);
            }
            break;
        }
        //calcul du nombre de likes/dislikes
        newValues.likes = newValues.usersLiked.length;
        newValues.dislikes = newValues.usersDisliked.length;
        //mise à jour de la sauce avec les nouvelles valeurs
        Sauce.updateOne({ _id: sauceId }, newValues).then(() =>
          res.status(200).json({ message: "Sauce évaluée !" })
        );
      })
      .catch((error) => res.status(500).json({ error }));
  };