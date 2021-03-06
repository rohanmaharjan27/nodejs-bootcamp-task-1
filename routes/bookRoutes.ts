import express from 'express';
import bookUpload from '../config/multerConfig';
import bookController from '../controllers/bookControllers';

const bookRouter = express.Router();

const {
  bookIndex,
  bookCreate,
  bookUpdate,
  bookDelete,
  bookForm,
  rentBookForm,
  updateBookForm,
} = bookController;

bookRouter.get('/', bookIndex);
bookRouter.get('/add', bookForm);
bookRouter.post('/', bookUpload.single('image'), bookCreate);
bookRouter.put('/:id', bookUpdate);
bookRouter.delete('/:id', bookDelete);
bookRouter.get('/book/:id', rentBookForm);
bookRouter.get('/update-book/:id', updateBookForm);

export default bookRouter;
