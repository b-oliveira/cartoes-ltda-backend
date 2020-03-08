import * as Yup from 'yup';

import Transaction from '../models/Transaction';
import Modality from '../models/Modality';
import Card from '../models/Card';
import CardModality from '../models/CardModality';

class TransactionController {
  async index(_, res) {
    const transactions = await Transaction.findAll({
      attributes: ['sequential', 'value', 'date'],
      include: [
        {
          model: CardModality,
          as: 'card_modality',
          attributes: ['card_id', 'modality_id'],
          include: [
            {
              model: Card,
              as: 'card',
              attributes: ['id', 'name'],
            },
            {
              model: Modality,
              as: 'modality',
              attributes: ['id', 'name', 'rate_percentage', 'days_term'],
            },
          ],
        },
      ],
    }).map(transaction => {
      const { sequential, value, date, card_modality } = transaction;
      const { card, modality } = card_modality;

      return { sequential, value, date, card, modality };
    });

    return res.json(transactions);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      card_id: Yup.number().required(),
      modality_id: Yup.number().required(),
      sequential: Yup.string().required(),
      value: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Requisição inválida!' });

    const { card_id, modality_id, sequential, value, date } = req.body;

    const transaction = await Transaction.findOne({
      where: {
        sequential,
      },
    });

    if (transaction)
      return res.status(400).json({
        error: 'Já existe uma transação com o número sequencial informado!',
      });

    const card_modality = await CardModality.findOne({
      attributes: ['id'],
      where: {
        card_id,
        modality_id,
      },
      include: [
        {
          model: Card,
          as: 'card',
          attributes: ['id', 'name'],
        },
        {
          model: Modality,
          as: 'modality',
          attributes: ['id', 'name', 'rate_percentage', 'days_term'],
        },
      ],
    });

    if (!card_modality)
      return res.status(400).json({ error: 'Cartão não encontrado!' });

    const { id } = await Transaction.create({
      card_modality_id: card_modality.id,
      sequential,
      value,
      date,
    });

    const { card, modality } = card_modality;

    return res.status(200).json({
      id,
      sequential,
      value,
      date,
      card,
      modality,
    });
  }
}

export default new TransactionController();