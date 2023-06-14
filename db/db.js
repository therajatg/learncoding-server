const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "gbilceda",
//   password: "yr9WAFThYaJkEmr9CWrNT6PmfEIWXTO8",
//   host: "fanny.db.elephantsql.com",
//   port: 5432,
//   database: "gbilceda",
// });

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
});

module.exports = pool;
