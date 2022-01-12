import { Schema, model } from 'mongoose';

export interface Book {
  name: string;
  author: string;
  image?: string;
}

const bookSchema = new Schema<Book>(
  {
    name: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

// creating model based on blogSchema (schema defines the structure) to provide an interface by which to communicate with database collections for that document type
const BookModel = model<Book>('User', bookSchema);

export default BookModel;
