import express from 'express';
import chalk from 'chalk';

import mongoose from 'mongoose';
import BookModel, { Book } from './models/book';

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

// register view engine
app.set('view engine', 'ejs');
app.set('views', 'Views-EJS');

// creating example get api to create a sample document for the database
app.get('/book', (req, res) => {
  const exampleBook: Book = {
    name: 'The Silmarillion',
    author: 'J.R.R. Tolkein',
    image: 'https://pos.booksmandala.com/images/6656',
  };

  const book = new BookModel(exampleBook);

  book
    .save()
    .then((result: any) => {
      res.send(result);
      console.log(chalk.green('Book added successfully!'));
    })
    .catch((err: any) => {
      console.log(err);
      console.log(chalk.green('Failed to add book!'));
    });
});
