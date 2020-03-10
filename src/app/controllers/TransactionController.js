import * as Yup from 'yup';
import { addBusinessDays, parseISO, formatISO } from 'date-fns';

import formatPrice from '../util/format';

import Transaction from '../models/Transaction';
import Modality from '../models/Modality';
import Card from '../models/Card';
import CardModality from '../models/CardModality';

class TransactionController {
  async index(_, res) {
    const transactions = await Transaction.findAll({
      attributes: [
        'sequential',
        'value',
        'net_value',
        'date',
        'available_date',
      ],
      include: [
        {
          model: CardModality,
          as: 'card_modality',
          attributes: ['id'],
          include: [
            {
              model: Card,
              as: 'card',
              attributes: ['id', 'name'],
            },
            {
              model: Modality,
              as: 'modality',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    }).map(transaction => {
      const {
        sequential,
        value,
        net_value,
        date,
        available_date,
        card_modality,
      } = transaction;
      const { card, modality } = card_modality;

      return {
        sequential,
        value: formatPrice(value),
        net_value: formatPrice(net_value),
        date: formatISO(date),
        available_date: formatISO(available_date),
        card,
        modality,
      };
    });

    return res.json(transactions);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      card_id: Yup.number()
        .positive()
        .required(),
      modality_id: Yup.number()
        .positive()
        .required(),
      sequential: Yup.string().required(),
      value: Yup.number()
        .positive()
        .required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Requisição inválida!' });

    const { card_id, modality_id, sequential, value, date } = req.body;

    const transaction = await Transaction.findOne({
      attributes: ['id'],
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

    const { card, modality } = card_modality;

    const { id, name, rate_percentage, days_term } = modality;

    const net_value = value - value * (rate_percentage / 100);
    const available_date = addBusinessDays(parseISO(date), days_term);

    await Transaction.create({
      card_modality_id: card_modality.id,
      sequential,
      value,
      net_value,
      date,
      available_date,
    });

    return res.status(200).json({
      sequential,
      value: formatPrice(value),
      net_value: formatPrice(net_value),
      date: formatISO(parseISO(date)),
      available_date: formatISO(available_date),
      card,
      modality: {
        id,
        name,
      },
    });
  }
}

export default new TransactionController();
