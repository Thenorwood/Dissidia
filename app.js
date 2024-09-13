import express from 'express';
import dissidiaRouter from './routes/dissidia.js';

const port = process.env.PORT || 3000;
const app = express();

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//routes
app.use('/api/dissidia',dissidiaRouter);



app.listen(port, () => {
  console.log(`dissidia api listening on port ${port}`);
});