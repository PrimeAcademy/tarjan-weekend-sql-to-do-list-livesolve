const pg = require('pg');

console.log(`What's my database URL?`, process.env.DATABASE_URL);

// const pool = new pg.Pool({
//   database: 'weekend-to-do-app',
// });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

module.exports = pool;