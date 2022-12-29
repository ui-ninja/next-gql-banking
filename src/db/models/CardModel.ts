import mongoose, { model, models, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const cardSchema = new Schema(
  {
    cardNumber: { type: Number, required: true, unique: true },
    cardType: {
      type: String,
      required: true,
    },
    expiryMonth: {
      type: Number,
      required: true,
    },
    expiryYear: {
      type: Number,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

cardSchema.pre('save', async function (next) {
  if (this.cvv && this.isModified('cvv')) {
    const salt = await bcrypt.genSalt(10);
    this.cvv = await bcrypt.hash(this.cvv, salt);
  }
  next();
});

const CardModel = models.Card || model('Card', cardSchema);

export default CardModel;
