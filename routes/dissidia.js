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
     const dissidia = await prisma.dissidia.findMany();

     res.json(dissidia);
  });


  //get a character by id
router.get('/get/:id', async (req, res) => {
  const id  = req.params.id;

  //validate id is a num
  if(isNaN(id)){
    return res.status(400).json({ message: 'Invalid  character id'});
  }

  //by ID
  const dissidia = await prisma.dissidia.findUnique({
    where: {
      id: parseInt(id),
      },
  });

  if (dissidia) {
    res.json(dissidia);
  }else{
    res.status(404).json({ message: "character not found"})
  }
});

  //...api/dissidia/create
  router.post('/create', upload.single('image'), async(req, res) => {
    const filename = req.file ? req.file.filename : null;
    const { Name, Series, Role, Deity, Description } = req.body;

    if(!Name || !Series ||!Role ||!Deity ) {
      // to-do:delete uploaded file
      return res.status(400).json({message: 'Required fields must have a value.'});
    }


    const dissidia = await prisma.dissidia.create({
      data: {
        Name: Name,
        Series: Series,
        Role: Role,
        Deity: Deity,
        Description: Description,
        filename: filename
      },
    });
    
    
    res.json(dissidia);
  });

  router.put('/update/:id', upload.single('image'), (req, res) => {
    const id = req.params.id;

    // capture the remaining inputs

  // validate the inputs

  // get contact by id. return 404 if not found.

  // if image file is uploaded: get the filename to save in db. delete the old image file. set the filename to newfilename
  // if image file NOT uploaded: when updating record with prisma, set the filename to oldfilename

  // update record in the database (ensuring filename is new or old name)

    res.send('Update by id ' + id);
});

router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  // validate the input

  // get contact by id. return 404 if not found.

  // delete the image file

  // delete the contact in database

  res.send('Delete by id ' + id);
});

  //testing github classroom
export default router;
