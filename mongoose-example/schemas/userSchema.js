import mongoose from 'mongoose';
const { Schema } = mongoose; 


const userSchema = new Schema({
  // name: String,
  name: {
    type: String,
    // required: true,
    required: [true, 'поле name обязательно к заполнению'],
  },
});

const User = mongoose.model('user', userSchema);

export default User;