import Card from '../models/Card';

class CardController {
  async index(_, res) {
    const cards = await Card.findAll({
      attributes: ['id', 'name'],
    });

    return res.json(cards);
  }
}

export default new CardController();
