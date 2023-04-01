//appel au package multer
const multer = require('multer');
//traitement des MIMES TYPES
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
//création de la fonction de la fonction d'enregistrement
const storage = multer.diskStorage({
  //stockage dans le dossier images
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  //création du nom du fichier avec nom d'origine + underscores + timestamp + constante dictionnaire de type MIME
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});
//export de la fonction multer gérant uniquement les fichiers image
module.exports = multer({storage: storage}).single('image');