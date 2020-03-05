require('dotenv').config();

const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          name: process.env.ADMIN_USER_NAME,
          password_hash: bcrypt.hashSync(process.env.ADMIN_USER_PASSWORD, 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
