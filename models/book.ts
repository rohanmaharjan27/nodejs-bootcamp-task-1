import { Schema, model } from 'mongoose';
import { Book } from './interfaces';

const bookSchema = new Schema<Book>(
  {
    name: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

// creating model based on bookSchema (schema defines the structure) to provide an interface by which to communicate with database collections for that document type
const BookModel = model<Book>('Book', bookSchema);

export default BookModel;
