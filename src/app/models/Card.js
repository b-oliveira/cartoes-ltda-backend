import Sequelize, { Model } from 'sequelize';

class Card extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Modality, {
      through: models.CardModality,
      foreignKey: 'card_id',
      as: 'modalities',
    });
  }
}

export default Card;
