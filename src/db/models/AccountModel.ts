import mongoose, { model, models, Schema } from 'mongoose';

const accountSchema = new Schema(
  {
    accountNumber: { type: Number, required: true, unique: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AccountModel = models.Account || model('Account', accountSchema);

export default AccountModel;
