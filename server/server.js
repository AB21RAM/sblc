const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Satara#2359',
  database: 'todo_list'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as ID ' + connection.threadId);
});

// API endpoints
app.get('/api/tasks', (req, res) => {
  connection.query('SELECT * FROM tasks', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/api/tasks', (req, res) => {
  const { task } = req.body;
  connection.query('INSERT INTO tasks (task) VALUES (?)', [task], (error, results) => {
    if (error) throw error;
    console.log("Data Inserted ")
    res.json({ id: results.insertId, task });
  });
});

// Add other CRUD endpoints here

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
