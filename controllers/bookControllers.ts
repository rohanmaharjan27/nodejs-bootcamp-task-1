import { RequestHandler } from 'express';
import chalk from 'chalk';
import BookModel from '../models/book';

const bookIndex: RequestHandler = (req, res) => {
  BookModel.find()
    .sort({ createdAt: 1 })
    .then((result) => {
      res.render('books/index', { title: 'Books', books: result });
    })
    .catch((err) => console.log(err));
};

const bookForm: RequestHandler = (req, res) => {
  res.render('books/bookForm', { title: 'Create Book' });
};

const bookCreate: RequestHandler = (req, res) => {
  const name = req.body.name;

  const imageName = req.file?.path;

  const finalObj = {
    ...req.body,
    image: imageName,
  };

  BookModel.find({ name })
    .exec()
    .then((book) => {
      if (book.length >= 1) {
        res.status(409).json({
          error_message: 'Book already exists!',
        });
      } else {
        const book = new BookModel(finalObj);
        book
          .save()
          .then((result) => {
            res.redirect('/books');
            console.log(chalk.green('Book added successfully!'));
          })
          .catch((err: any) => {
            console.log(err);
            console.log(chalk.green('Failed to add book!'));
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const bookUpdate: RequestHandler = (req, res) => {
  const _id = req.params.id;

  BookModel.findOneAndUpdate({ _id }, req.body, { new: true })
    .then((book) => {
      if (book !== null) {
        res.status(201).json({
          book,
          message: 'Book Updated Successfully!',
        });
      } else {
        res.status(404).json({
          message: `Book with id ${_id} not found!`,
        });
      }
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
};

const bookDelete: RequestHandler = (req, res) => {
  const id = req.params.id;

  BookModel.findByIdAndDelete(id)
    .then((_) => {
      res.json({ redirect: '/books', message: 'Deleted successfully!' });
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: err });
    });
};

const rentBookForm: RequestHandler = (req, res) => {
  const _id = req.params.id;

  BookModel.findById(_id)
    .then((result) => {
      res.render('books/rentBookForm', {
        title: 'Blog Details',
        book: result,
      });
    })
    .catch((err) => res.status(400).render('404', { title: 'Book Not Found' }));
};

const bookController = {
  bookIndex,
  bookCreate,
  bookUpdate,
  bookDelete,
  bookForm,
  rentBookForm,
};

export default bookController;
