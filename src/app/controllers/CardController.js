import Card from '../models/Card';
import Modality from '../models/Modality';

class CardController {
  async index(_, res) {
    const cards = await Card.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          model: Modality,
          as: 'modalities',
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return res.json(cards);
  }
}

export default new CardController();
