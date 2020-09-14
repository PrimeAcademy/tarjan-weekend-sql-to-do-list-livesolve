const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./pool');
const { query } = require('express');

const app = express();

// Serve static files from server/public folder
app.use(express.static('server/public'));

// Setup body parser to read request JSON body
app.use(bodyParser.urlencoded({ extended: true }));


/**
 * GET /tasks
 * --> array of task objects
 * [
    {
      name: 'Mow the lawn', // string or VARCHAR
      isCompleted: true     // BOOLEAN
    }
  ]
 */
app.get('/tasks', (req, res) => {
  let queryString = `SELECT * FROM "tasks";`
  pool.query(queryString)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((err) => {
      console.error("GET request failed", err);
      res.sendStatus(500);
    })
});

app.post('/tasks', (req, res) => {
  console.log("POST /tasks req.body:", req.body);
  let taskName = req.body.name;
  console.log("task name is", taskName);

  let queryString = `
    INSERT INTO "tasks" ("name") 
    VALUES ($1);
  `;
  pool.query(queryString, [taskName])
    .then((results) => {
      res.sendStatus(201)
    })
    .catch((err) => {
      console.error("POST request failed", err);
      res.sendStatus(500);
    });
})

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
})