import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Requisição inválida!' });

    const { name, password } = req.body;

    const user = await User.findOne({ where: { name } });

    if (!user || !(await user.checkPassword(password)))
      return res.status(401).json({ error: 'Credenciais inválidas!' });

    const { id } = user;

    return res.status(200).json({
      user: {
        id,
        name,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
