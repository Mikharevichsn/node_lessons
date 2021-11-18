import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const SALT_FACTOR = 10;
const salt = await bcrypt.genSalt(SALT_FACTOR);
const { Schema } = mongoose;

const userSchema = new Schema({
  login: {
    type: String,
    unique: [true, 'sdfsfsdf'],
    required: [true, 'поле LOGIN обязательно к заполнению'],
  },
  password: {
    type: String,
    required: [true, 'Поле PASSWORD обязательно к заполнению'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Поле EMAIL обязательно к заполнению'],
  },
  token: {
    type: [String, null],
  },
  emailConfirmed: Boolean,
  confirmToken: {
    type: String,
    unique: true,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model('user', userSchema);

export default User;
