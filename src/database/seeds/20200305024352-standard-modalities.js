module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'modalities',
      [
        {
          name: 'Débito',
          rate_percentage: 2,
          days_term: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Crédito',
          rate_percentage: 3,
          days_term: 31,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
