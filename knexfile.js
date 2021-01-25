// Update with your config settings.

require('dotenv').config()

// console.log(process.env.DB_NAME);
module.exports = {

  client: 'mysql2',
  connection: {
    multipleStatements: true,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true,
    typeCast: function (field, next) {
      if (field.type == 'JSON') {
        return (JSON.parse(field.string())); 
      } else if (field.type === 'TINY' && field.length === 1) {
        return (field.string() === '1'); // 1 = true, 0 = false
      } 
      return next();
    }
  },
  pool: {
    min: 2,
    max: 50
  },
  migrations: {
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: './seeds'
  }

};




