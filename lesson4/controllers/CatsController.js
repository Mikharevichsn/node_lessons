import { HttpCodes } from '../constants.js';
import Cat from '../database/schemas/catSchema.js';

class CatsController {
  constructor() { }

  static async getAll(req, res) {
    const cats = await Cat.find();

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

    try {
      const cat = await Cat.findById(id);

      res.send({
        success: true,
        code: HttpCodes.OK,
        data: {
          cat,
        },
      });
    } catch (err) {
      res.send({
        success: false,
        code: HttpCodes.NOT_FOUND,
        data: `Not found`,
        message: `Кот не найден. ${err.message}`,
      });
    }
  }

  static async getByName(req, res) {
    const { name } = req.params;
    try {
      const cat = await Cat.findOne({ name });
      if (cat) {
        return res.send({
          success: true,
          code: HttpCodes.OK,
          data: {
            cat,
          },
        });
      }

      return res.send({
        success: false,
        code: HttpCodes.NOT_FOUND,
        data: `Not found`,
        message: `Кот не найден.`,
      });
    } catch(err) {
      res.send({
        success: false,
        code: HttpCodes.INTERNAL_SERVER_ERROR,
        data: `Неизвестная ошибка`,
        message: `${err.message}`,
      });
    }
  }

  static async add(req, res) {
    try {
      const cat = await Cat.create(req.body);
  
      res.send({
        success: true,
        code: HttpCodes.OK,
        data: {
          cat,
        },
      });

    } catch(err) {
      res.send({
        success: false,
        code: HttpCodes.BAD_REQUEST,
        data: `Некорректный запрос`,
        message: `${err.message}`,
      });
    }
  }

  static async removeById(req, res) {
    const { id } = req.body;

    try {
      const cat = await Cat.findByIdAndRemove(id);
      res.send({
        success: true,
        code: HttpCodes.OK,
        data: {
          cat,
        },
      });
    } catch(err) {
      res.send({
        success: false,
        code: HttpCodes.NOT_FOUND,
        data: `Not found`,
        message: `Кот не найден`,
      });
    }
  }

  static async vaccinateById(req, res) {
    const { id } = req.params;

    try {
      const cat = await Cat.findByIdAndUpdate(
        { _id: id},
        { vaccinated: true },
        { new: true },
      );

      res.send({
        success: true,
        code: HttpCodes.OK,
        data: {
          cat,
        },
      });
    } catch (err) {
      res.send({
        success: false,
        code: HttpCodes.NOT_FOUND,
        data: `Not found`,
        message: `Кот не найден. ${err.message}`,
      });
    }
  }

  static async updateById(req, res) {
    const { id, ...rest } = req.body;

    try {
      const cat = await Cat.findByIdAndUpdate(
        { _id: id},
        { ...rest },
        { new: true },
      );

      res.send({
        success: true,
        code: HttpCodes.OK,
        data: {
          cat,
        },
      });
    } catch (err) {
      res.send({
        success: false,
        code: HttpCodes.NOT_FOUND,
        data: `Not found`,
        message: `Кот не найден. ${err.message}`,
      });
    }
  }
}

export default CatsController;
