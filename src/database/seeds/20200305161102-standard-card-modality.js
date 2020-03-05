module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'card_modality',
      [
        {
          card_id: 1,
          modality_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          card_id: 1,
          modality_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          card_id: 2,
          modality_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          card_id: 2,
          modality_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          card_id: 3,
          modality_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          card_id: 3,
          modality_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          card_id: 4,
          modality_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          card_id: 4,
          modality_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
