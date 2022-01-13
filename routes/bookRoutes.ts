import express from 'express';
import bookController from '../controllers/bookControllers';

const bookRouter = express.Router();

const { bookIndex, bookCreate, bookUpdate, bookDelete, bookForm } =
  bookController;

bookRouter.get('/', bookIndex);
bookRouter.get('/create-book', bookForm);
bookRouter.post('/', bookCreate);
bookRouter.put('/:id', bookUpdate);
bookRouter.delete('/:id', bookDelete);

export default bookRouter;
