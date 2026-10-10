const db = require("../../db/db.js");

module.exports = {
  getUserById: async (id) => {
    const [rows] = await db.promise().query(`
            SELECT * FROM users where userId='${id}'
          `);
    return rows[0];
  },
  getUserByEmail: async (email) => {
    const [rows] = await db.promise().query(`
            SELECT * FROM users where email='${email}'
          `);
    return rows[0];
  },
};
