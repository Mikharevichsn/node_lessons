import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
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
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }
});

catSchema.plugin(mongoosePaginate);

const Cat = mongoose.model('cat', catSchema);

export default Cat;