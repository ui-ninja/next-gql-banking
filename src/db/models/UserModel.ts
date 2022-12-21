import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    residence: String,
    occupation: String,
    income: { type: Number, required: true },
    govtId: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = model('User', userSchema);

export default UserModel;
