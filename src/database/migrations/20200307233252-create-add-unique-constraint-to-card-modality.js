module.exports = {
  up: queryInterface => {
    return queryInterface.addConstraint(
      'card_modality',
      ['card_id', 'modality_id'],
      {
        type: 'unique',
        name: 'card_modality_unique_constraint',
      }
    );
  },

  down: queryInterface => {
    return queryInterface.removeConstraint(
      'card_modality',
      'card_modality_unique_constraint'
    );
  },
};
