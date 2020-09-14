const pg = require('pg');

console.log(`What's my database URL?`, process.env.DATABASE_URL);

// const pool = new pg.Pool({
//   database: 'weekend-to-do-app',
// });

let pool;
if (process.env.DATABASE_URL) {
  console.log("Gonna connect to a heroku DB");
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
  });
}
else {
  console.log("Assuming we're running locally");
  pool = new pg.Pool({
    database: "weekend-to-do-app"
  });
}

module.exports = pool;