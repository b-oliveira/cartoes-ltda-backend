module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'cards',
      [
        {
          name: 'VISA',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'MASTERCARD',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'ELO',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'AMEX',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
