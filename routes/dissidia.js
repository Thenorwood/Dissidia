import express from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import fs from 'fs'; //this lets me update old image files

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

  router.put('/update/:id', upload.single('image'), async(req, res) => {
    const id = parseInt(req.params.id);
    const {Name, Series, Role, Deity, Description} = req.body;

    if(!Name || !Series ||!Role ||!Deity ) {
      // to-do:delete uploaded file. returns 400
      return res.status(400).json({message: 'Required fields must have a value.'});
    }
    //validating the req. fields

    const dissidia = await prisma.dissidia.findUnique({
      where: {
        id: id
      },
    });

    // character is not found, return 404 
  if (!dissidia) {
    return res.status(404).json({ message: 'Character not found' });
  }
  let filename = dissidia.filename;

  if (req.file) {
    filename = req.file.filename;

    const oldPath ='public/images/' +dissidia.filename;

    if (dissidia.filename && fs.existsSync(oldPath)){
      fs.unlink(oldPath, (err) => {
        if (err) {
          console.error("failed to delete Old Image", err);
        }
      });
    }
  }

  //update record
  const updateChar = await prisma.dissidia.update({
    where: {id: id},
    data: {
      Name: Name,
      Series: Series,
      ROle: Role,
      Deity: Deity,
      Description: Description,
      filename: filename,
    },
  });

  //resp. w success message
  return res.status(200).json({
    message: "Character updated successfully",
    characxter: updateChar,
  });

});
  
    // capture the remaining inputs

  // validate the inputs

  // get contact by id. return 404 if not found.

  // if image file is uploaded: get the filename to save in db. delete the old image file. set the filename to newfilename
  // if image file NOT uploaded: when updating record with prisma, set the filename to oldfilename

  // update record in the database (ensuring filename is new or old name)

 


// DELETE route to remove char by ID
router.delete('/delete/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  // Validate  ID is a number
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid character id' });
  }

  // Find character by ID 
  const dissidia = await prisma.dissidia.findUnique({
    where: { id: id }
  });

  // If character not found, return 404
  if (!dissidia) {
    return res.status(404).json({ message: 'Character not found' });
  }

  // Path to i8mg file
  const imagePath = 'public/images/' + dissidia.filename;

  // Checks if character has associated image &if  file exists
  if (dissidia.filename && fs.existsSync(imagePath)) {
    // Attempt to delete the image file
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Failed to delete image:', err);
      }
    });
  }

  //this will delete the character
  await prisma.dissidia.delete({
    where: { id: id }
  });

  // Respond w/ success message
  return res.status(200).json({ message: 'Character deleted successfully' });
});

  // validate the input

  // get contact by id. return 404 if not found.

  // delete the image file

  // delete the contact in database

 

  //testing github classroom
export default router;
