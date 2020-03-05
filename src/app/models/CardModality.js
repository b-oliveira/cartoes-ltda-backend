import { Model } from 'sequelize';

class CardModality extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
        tableName: 'card_modality',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Card, {
      foreignKey: 'card_id',
      as: 'card',
    });

    this.belongsTo(models.Modality, {
      foreignKey: 'modality_id',
      as: 'modality',
    });
  }
}

export default CardModality;
