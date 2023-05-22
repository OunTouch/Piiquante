const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../models/User');



//fonction d'enregistrement utilisateur
exports.signup = (req, res, next) => {
    //fonction asynchrone de hachage du mot de passe
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        //création nouvel utilisateur avec le mot de passe haché, depuis le modèle mongoose
        const user = new User({
          email: req.body.email,
          password: hash
        });
        //enregistrement nouvel utilisateur
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

//fonction de login utilisateur
exports.login = (req, res, next) => {
  //vérification que l'email rentré est bien existant dans la base de données
   User.findOne({ email: req.body.email })
       .then(user => {
           //si aucun utilisateur n'est trouvé, message d'erreur ne divulgant pas d'informations 
           if (!user) {
              return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
           }
           //comparaison des mots de passe
           bcrypt.compare(req.body.password, user.password)
               .then(valid => {
                   if (!valid) {
                       return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                   }
                   //renvoi d'un id et d'un token si les mots de passe correspondent
                   res.status(200).json({
                       userId: user._id,
                       token: jwt.sign(
                        { userId: user._id },
                        'VbVrudrewNr4YcEoLf1BaeFcuCx1DKFykCyFtVyDUzNnHHo0eA9VxEYvcWTGIZT',
                        { expiresIn: '24h' }
                       )
                   });
               })
               .catch(error => res.status(500).json({ error }));
       })
       .catch(error => res.status(500).json({ error }));
};

