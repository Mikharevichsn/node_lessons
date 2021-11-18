import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';
import { HttpCodes } from '../constants.js';
import User from '../database/schemas/userSchema.js';
import { sendMail } from '../helpers/sendMail.js';

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
      const confirmToken = uuid();
      const newUser = await User.create({
        ...req.body,
        emailConfirmed: false,
        confirmToken,
      });

      const { login, _id: id, email } = newUser;

      sendMail({
        to: email,
        subject: 'Подтвердите адрес электронной почты',
        html: `Добрый день! \nДля подтверждения адреса перейдите по <a href="http://localhost:6789/api/user/confirm/${confirmToken}">ссылке</a>`,
      });

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
      await User.updateOne({ _id: user.id }, { token });

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

  static async confirmEmail(req, res) {
    const { confirmToken } = req.params;

    if (!confirmToken) {
      return res.send({
        success: false,
        code: HttpCodes.BAD_REQUEST,
        data: 'Bad request',
        message: `Ошибка! ${err.message}`,
      });
    }

    const user = await User.findOne({ confirmToken });

    if (!user) {
      return res.send({
        success: false,
        code: HttpCodes.NOT_FOUND,
        data: 'Not found',
        message: 'Пользователь не найден',
      });
    }

    user.confirmToken = null;
    user.emailConfirmed = true;
    await user.save();

    return res.send({
      success: true,
      code: HttpCodes.OK,
      data: null,
    });
  }

  static async verifyEmail(req, res) {
    const { email } = req.body;

    if (!email) {
      return res.send({
        success: false,
        code: HttpCodes.BAD_REQUEST,
        data: 'Bad request',
        message: 'missing required field email',
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.send({
        success: false,
        code: HttpCodes.NOT_FOUND,
        data: 'Not found',
        message: 'Пользователь не найден',
      });
    }

    if (user.emailConfirmed) {
      return res.send({
        success: false,
        code: HttpCodes.BAD_REQUEST,
        data: 'Bad request',
        message: 'Verification has already been passed',
      });
    }

    const { confirmToken } = user;

    sendMail({
      to: email,
      subject: 'ПОВТОРНО! Подтвердите адрес электронной почты',
      html: `Добрый день! \nДля подтверждения адреса перейдите по <a href="http://localhost:6789/api/user/confirm/${confirmToken}">ссылке</a>`,
    });

    return res.send({
      success: true,
      code: HttpCodes.OK,
      data: {
        messsage: 'Verification email sent',
      },
    });
  }
}

export default UserController;
