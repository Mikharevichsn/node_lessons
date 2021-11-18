import { HttpCodes } from '../constants.js';
import Cat from '../database/schemas/catSchema.js';
import mongoose from 'mongoose';

class CatsController {
  constructor() {}

  static async getAll(req, res) {
    const userId = req.user._id;
    const { offset = 0, limit = 5, sortBy, sortByDesc } = req.query;
    const cats = await Cat.paginate(
      { owner: userId },
      {
        offset,
        limit,
        sort: {
          ...(sortBy && { [sortBy]: 1 }),
          ...(sortByDesc && { [sortByDesc]: -1 }),
        },
        populate: {
          path: 'owner',
          select: 'login email -_id',
        },
      }
    );

    const { docs, totalDocs, offset: respOffset, respLimit } = cats;

    return res.send({
      success: true,
      code: HttpCodes.OK,
      data: {
        cats: docs,
        totalDocs,
        offset: respOffset,
        limit: respLimit,
      },
    });
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const cat = await Cat.findById(id);

      return res.send({
        success: true,
        code: HttpCodes.OK,
        data: {
          cat,
        },
      });
    } catch (err) {
      return res.send({
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
    } catch (err) {
      return res.send({
        success: false,
        code: HttpCodes.NOT_FOUND,
        data: `Not found`,
        message: `Кот не найден. ${err.message}`,
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
    } catch (err) {
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
    } catch (err) {
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
        { _id: id },
        { vaccinated: true },
        { new: true }
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
        { _id: id },
        { ...rest },
        { new: true }
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
