import express from 'express';
import chalk from 'chalk';

import mongoose from 'mongoose';
import bookRouter from './routes/bookRoutes';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';

require('dotenv').config();

const port = process.env.PORT || 8000;

// mongoDB connection
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dzsue.mongodb.net/RohanLibrary?retryWrites=true&w=majority`;

mongoose
  .connect(dbURI)
  .then((_) => {
    // listen for requests
    app.listen(port, () =>
      console.log(
        chalk.green.inverse(
          `Server started on port ${process.env.PORT || 8000}`
        )
      )
    );
  })
  .catch((err) => console.log(err));

// express app
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// register view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// middleware and static files
app.use(express.static('public'));

// takes all the url encoded data and passes that into an object that we can use in the req object
// middleware to accept formdata
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.redirect('/books');
});

app.use('/books', bookRouter);
