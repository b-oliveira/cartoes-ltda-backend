import Modality from '../models/Modality';

class ModalityController {
  async index({ res }) {
    const modalities = await Modality.findAll({
      attributes: ['id', 'name', 'rate_percentage', 'days_term'],
    });

    return res.json(modalities);
  }
}

export default new ModalityController();
