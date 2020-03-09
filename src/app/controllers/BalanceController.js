import { fn, col, Op } from 'sequelize';
import { endOfDay, parseISO, formatISO } from 'date-fns';

import formatPrice from '../util/format';

import Transaction from '../models/Transaction';

class BalanceController {
  async index(req, res) {
    const { date = formatISO(new Date()) } = req.query;

    const available = await Transaction.findAll({
      attributes: [
        [fn('sum', col('value')), 'value'],
        [fn('sum', col('net_value')), 'net_value'],
      ],
      where: {
        available_date: {
          [Op.lte]: endOfDay(parseISO(date)),
        },
      },
    }).map(({ value, net_value }) => {
      return {
        value: formatPrice(value),
        net_value: formatPrice(net_value),
      };
    });

    const outstanding = await Transaction.findAll({
      attributes: [
        [fn('sum', col('value')), 'value'],
        [fn('sum', col('net_value')), 'net_value'],
      ],
      where: {
        available_date: {
          [Op.gt]: endOfDay(parseISO(date)),
        },
      },
    }).map(({ value, net_value }) => {
      return {
        value: formatPrice(value),
        net_value: formatPrice(net_value),
      };
    });

    return res.json({
      available,
      outstanding,
    });
  }
}

export default new BalanceController();
