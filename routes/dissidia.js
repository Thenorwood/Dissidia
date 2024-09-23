import express from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';

const router = express.Router();

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
 



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
//router.get('/', (req, res) => {
 // res.send('dissidia route');
//});


//...api/dissidia/all
router.get('/all', async (req, res) => {
     const characters = await prisma.contact.findMany();

     res.json(contacts);
  });


  //get a character by id
router.get('/get/:id', async (req, res) => {
  const id  = req.params.id;

  //validate id is a num
  if(isNaN(id)){
    return res.status(400).json({ message: 'Invalid  character id'});
  }
})

  //...api/dissidia/create
router.post('/create', upload.single('image'), async(req, res) => {
    const filename = req.file ? req.file.filename : null;
    const { Name, Series, Deity, Description } = req.body;

    if(!Name || !Series || !Deity ) {
      // to-do:delete uploaded file
      return res.status(400).json({message: 'Required fields must have a value.'});
    }


    const character = await prisma.character.create({
      data: {
        Name: Name,
        Series: Series,
        Deity: Deity,
        Description: Description,
        filename: filename
      },
    });
    
    
    res.send('add character');
  });

  //testing github classroom
export default router;
