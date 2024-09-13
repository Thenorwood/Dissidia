import express from 'express';

const router = express.Router();


//...api/dissidia
router.get('/', (req, res) => {
  res.send('dissidia route');
});


//...api/dissidia/all
router.get('/all', (req, res) => {
     //to do... get all characters for database
    res.send('get all Dissidia route');
  });

  //api/dissidia/create
router.post('/create', (req, res) => {

     //to do... add new characters for database
    res.send('add a new Dissidia route');
  });

  //testing github classroom
export default router;
