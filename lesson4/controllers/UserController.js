import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { HttpCodes } from '../constants.js';
import User from '../database/schemas/userSchema.js';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.SECRET;

const SALT_FACTOR = 10;
const salt = await bcrypt.genSalt(SALT_FACTOR);

class UserController {
  constructor() {}

  static async register(req, res) {
    const { email } = req.body;

    if (!email)
      return res.send({
        success: false,
        code: HttpCodes.BAD_REQUEST,
        data: `Bad request`,
        message: `Необходимо передать поля`,
      });

    const user = await User.findOne({ email });
    if (user) {
      return res.send({
        success: false,
        code: HttpCodes.BAD_REQUEST,
        data: 'Bad request',
        message: 'Такой email уже зарегистрирован в системе.',
      });
    }

    try {
      const newUser = await User.create(req.body);
      console.log('newUser = ', newUser);
      const { login, _id: id } = newUser;
      res.send({
        success: true,
        code: HttpCodes.OK,
        data: {
          id,
          login,
        },
      });
    } catch (err) {
      return res.send({
        success: false,
        code: HttpCodes.BAD_REQUEST,
        data: 'Bad request',
        message: `Ошибка! ${err.message}`,
      });
    }
  }

  static async login(req, res) {
    const { login, password } = req.body;

    const user = await User.findOne({ login });
    if (!user) {
      return res.send({
        success: false,
        code: HttpCodes.BAD_REQUEST,
        data: 'Bad request',
        message: `Пользователь с логином ${login} не найден`,
      });
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
      console.log('🚀 ~ file: UserController.js ~ line 75 ~ UserController ~ login ~ token', token)
      await User.updateOne({ _id: user.id}, { token });

      return res.send({
        success: true,
        code: HttpCodes.OK,
        data: {
          id: user.id,
          login,
          token,
        },
      });
    }

    return res.status(HttpCodes.Unauthorized).send({
      success: false,
      code: HttpCodes.Unauthorized,
      data: 'Fobidden',
      message: `Ошибка авторизации`,
    });
  }

  // static async getAll(req, res) {
  //   const cats = await Cat.find();

  //   res.send({
  //     success: true,
  //     code: HttpCodes.OK,
  //     data: {
  //       cats,
  //     },
  //   });
  // }

  // static async getById(req, res) {
  //   const { id } = req.params;

  //   try {
  //     const cat = await Cat.findById(id);

  //     res.send({
  //       success: true,
  //       code: HttpCodes.OK,
  //       data: {
  //         cat,
  //       },
  //     });
  //   } catch (err) {
  //     res.send({
  //       success: false,
  //       code: HttpCodes.NOT_FOUND,
  //       data: `Not found`,
  //       message: `Кот не найден. ${err.message}`,
  //     });
  //   }
  // }

  // static async getByName(req, res) {
  //   const { name } = req.params;
  //   try {
  //     const cat = await Cat.findOne({ name });
  //     if (cat) {
  //       return res.send({
  //         success: true,
  //         code: HttpCodes.OK,
  //         data: {
  //           cat,
  //         },
  //       });
  //     }

  //     return res.send({
  //       success: false,
  //       code: HttpCodes.NOT_FOUND,
  //       data: `Not found`,
  //       message: `Кот не найден.`,
  //     });
  //   } catch(err) {
  //     res.send({
  //       success: false,
  //       code: HttpCodes.INTERNAL_SERVER_ERROR,
  //       data: `Неизвестная ошибка`,
  //       message: `${err.message}`,
  //     });
  //   }
  // }

  // static async add(req, res) {
  //   try {
  //     const cat = await Cat.create(req.body);

  //     res.send({
  //       success: true,
  //       code: HttpCodes.OK,
  //       data: {
  //         cat,
  //       },
  //     });

  //   } catch(err) {
  //     res.send({
  //       success: false,
  //       code: HttpCodes.BAD_REQUEST,
  //       data: `Некорректный запрос`,
  //       message: `${err.message}`,
  //     });
  //   }
  // }

  // static async removeById(req, res) {
  //   const { id } = req.body;

  //   try {
  //     const cat = await Cat.findByIdAndRemove(id);
  //     res.send({
  //       success: true,
  //       code: HttpCodes.OK,
  //       data: {
  //         cat,
  //       },
  //     });
  //   } catch(err) {
  //     res.send({
  //       success: false,
  //       code: HttpCodes.NOT_FOUND,
  //       data: `Not found`,
  //       message: `Кот не найден`,
  //     });
  //   }
  // }

  // static async vaccinateById(req, res) {
  //   const { id } = req.params;

  //   try {
  //     const cat = await Cat.findByIdAndUpdate(
  //       { _id: id},
  //       { vaccinated: true },
  //       { new: true },
  //     );

  //     res.send({
  //       success: true,
  //       code: HttpCodes.OK,
  //       data: {
  //         cat,
  //       },
  //     });
  //   } catch (err) {
  //     res.send({
  //       success: false,
  //       code: HttpCodes.NOT_FOUND,
  //       data: `Not found`,
  //       message: `Кот не найден. ${err.message}`,
  //     });
  //   }
  // }

  // static async updateById(req, res) {
  //   const { id, ...rest } = req.body;

  //   try {
  //     const cat = await Cat.findByIdAndUpdate(
  //       { _id: id},
  //       { ...rest },
  //       { new: true },
  //     );

  //     res.send({
  //       success: true,
  //       code: HttpCodes.OK,
  //       data: {
  //         cat,
  //       },
  //     });
  //   } catch (err) {
  //     res.send({
  //       success: false,
  //       code: HttpCodes.NOT_FOUND,
  //       data: `Not found`,
  //       message: `Кот не найден. ${err.message}`,
  //     });
  //   }
  // }
}

export default UserController;
