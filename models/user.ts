import { Schema, model } from 'mongoose';

interface User {
  first_name: string;
  last_name: string;
  email: string;
  image?: string;
  dob: Date;
}

const userSchema = new Schema<User>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String },
    dob: { type: Date },
  },
  { timestamps: true }
);

// creating model based on blogSchema (schema defines the structure) to provide an interface by which to communicate with database collections for that document type
const UserModel = model<User>('User', userSchema);

export default UserModel;
