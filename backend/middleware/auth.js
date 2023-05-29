//appel au package jsonwebtoken
const jwt = require('jsonwebtoken');
require('dotenv').config();
//création de la fonction de vérification du token
module.exports = (req, res, next) => {
   try {
        //récupération du token depuis le header authorization
        const token = req.headers.authorization.split(' ')[1];
        //vérification du token
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        //ajout id utilisateur du token à l'objet request
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};