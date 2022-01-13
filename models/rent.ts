import { Schema, model } from 'mongoose';
import { Rent } from './interfaces';

const rentSchema = new Schema<Rent>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String },
    rent_date: { type: Date },
    return_date: { type: Date },
    return_date_max: { type: Date },
  },
  { timestamps: true }
);

// creating model based on userSchema (schema defines the structure) to provide an interface by which to communicate with database collections for that document type
const RentModel = model<Rent>('Rent', rentSchema);

export default RentModel;
