import mongoose, { model, Schema } from 'mongoose';

const accountSchema = new Schema(
  {
    accountId: { type: Number, required: true, unique: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AccountModel = model('Account', accountSchema);

export default AccountModel;
