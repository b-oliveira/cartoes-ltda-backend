import Sequelize, { Model } from 'sequelize';

class Transaction extends Model {
  static init(sequelize) {
    super.init(
      {
        sequential: Sequelize.STRING,
        value: Sequelize.DOUBLE,
        net_value: Sequelize.DOUBLE,
        date: Sequelize.DATE,
        available_date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.CardModality, {
      foreignKey: 'card_modality_id',
      as: 'card_modality',
    });
  }
}

export default Transaction;
