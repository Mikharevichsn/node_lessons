import { ObjectId } from 'mongodb';
import collections from './index.js';

const { Cats } = collections;

class CatsModel { 
  constructor() {}

  static async findById(id) {
    return await Cats.findOne({ _id: ObjectId(id) });
  }

  static async deleteById(id) {
    return await Cats.deleteOne({ _id: ObjectId(id) });
  }
}

export default CatsModel;