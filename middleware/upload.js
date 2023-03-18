const multer = require('multer');
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
const upload = multer({storage : fileStorage})

const uploadHandler =  (req,res,next)=>{
  try {
    upload.single('profileImage')
    next()
  }  
  catch(err){
    console.log(err)
  }
}
module.exports = {uploadHandler , upload};