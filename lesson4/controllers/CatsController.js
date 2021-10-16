import { v4 as uuid } from 'uuid';
import db from '../database/index.js';
import { HttpCodes } from '../constants.js';

class CatsController {
  constructor() {}

  static getAll(req, res) {
    res.send({
      success: true,
      code: HttpCodes.OK,
      data: {
        cats: db.data.cats,
      },
    });
  }

  static getById(req, res) {
    const { id } = req.params;

    const cat = db.data.cats.find((el) => el.id === id);
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
    const cat = { id: uuid(), ...req.body };
    db.data.cats.push(cat);
    await db.write();

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

    const cat = db.data.cats.find((el) => el.id === id);

    if (cat) {
      db.data.cats = db.data.cats.filter((el) => el.id !== id);
      await db.write();

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

// class CatsController {
//   constructor() {}

//   getAll(req, res) {
//     res.send('все коты');
//   };

//   getById(req, res) {
//     res.send('cat by id');
//   };

//   add(req, res) {
//     res.send('add cat');
//   };
// }

// module.exports = new CatsController();
