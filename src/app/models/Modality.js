import Sequelize, { Model } from 'sequelize';

class Modality extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        rate_percentage: Sequelize.DOUBLE,
        days_term: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Modality;
