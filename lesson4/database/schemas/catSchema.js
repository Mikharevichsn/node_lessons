import mongoose from 'mongoose';
const { Schema } = mongoose; 


const catSchema = new Schema({
  // name: String,
  name: {
    type: String,
    // required: true,
    required: [true, 'поле NAME обязательно к заполнению'],
  },
  age: Number,
  vaccinated: {
    type: Boolean,
    default: false,
  }
});

const Cat = mongoose.model('cat', catSchema);

export default Cat;