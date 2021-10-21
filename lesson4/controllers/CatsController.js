import { HttpCodes } from '../constants.js';
import collections from '../database/index.js';
import CatsModel from '../database/Cats.model.js';


const { Cats } = collections;

class CatsController {
  constructor() {}
  
  static async getAll(req, res) {
    const cats = await Cats.find().toArray();

    res.send({
      success: true,
      code: HttpCodes.OK,
      data: {
        cats,
      },
    });
  }

  static async getById(req, res) {
    const { id } = req.params;
    // const cat = await Cats.findOne({ _id: ObjectId(id) });
    const cat = await CatsModel.findById(id);
    if (cat) {
      res.send({
        success: true,
        code: HttpCodes.OK,
        data: {
          cat,
        },
      });
    } else {
      res.send({
        success: false,
        code: HttpCodes.NOT_FOUND,
        data: `Not found`,
        message: `Кот не найден`,
      });
    }
  }

  static async getByName(req, res) {
    const { name } = req.params;
    const cat = await Cats.findOne({ name });
    if (cat) {
      res.send({
        success: true,
        code: HttpCodes.OK,
        data: {
          cat,
        },
      });
    } else {
      res.send({
        success: false,
        code: HttpCodes.NOT_FOUND,
        data: `Not found`,
        message: `Кот не найден`,
      });
    }
  }

  static async add(req, res) {
    const cat = await Cats.insertOne({ ...req.body })

    res.send({
      success: true,
      code: HttpCodes.OK,
      data: {
        cat,
      },
    });
  }

  static async removeById(req, res) {
    const { id } = req.body;

    const cat = await CatsModel.findById(id);
    
    if (cat) {
      await CatsModel.deleteById(id);

      res.send({
        success: true,
        code: HttpCodes.OK,
        data: {
          cat,
        },
      });
    } else {
      res.send({
        success: false,
        code: HttpCodes.NOT_FOUND,
        data: `Not found`,
        message: `Кот не найден`,
      });
    }
  }
}

export default CatsController;
