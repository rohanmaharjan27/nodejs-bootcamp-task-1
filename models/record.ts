import { Schema, model } from 'mongoose';
import { Record } from '../interfaces/interfaces';

const rentSchema = new Schema<Record>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    rent_date: { type: Date, required: true },
    return_date: { type: Date },
    return_date_max: { type: Date },
  },
  { timestamps: true }
);

// creating model based on userSchema (schema defines the structure) to provide an interface by which to communicate with database collections for that document type
const RentModel = model<Record>('Rent', rentSchema);

export default RentModel;
