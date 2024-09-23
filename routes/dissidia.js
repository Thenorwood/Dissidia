import express from 'express';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
   cb(null, 'public/images/'); // save uploaded files in `public/images` folder
   },
   filename: function (req, file, cb) {
   const ext = file.originalname.split('.').pop(); // get file extension
   const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1000) + '.' + ext; // generate unique filename - current timestamp + random number between 0 and 1000.
   cb(null, uniqueFilename);
   }
  });
  const upload = multer({ storage: storage });
  


//...api/dissidia
router.get('/', (req, res) => {
  res.send('dissidia route');
});


//...api/dissidia/all
router.get('/all', (req, res) => {
     //to do... get all characters for database
    res.send('get all dissidia route');
  });

  //...api/dissidia/create
router.post('/create', (req, res) => {
    //to do... add new characters for database
    res.send('add a new Dissidia route');
  });

  //testing github classroom
export default router;
