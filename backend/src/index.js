const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const cors = require('cors');
const app = express();
//const task = require('./task.json');

const url =
  process.env.MONGO_URL ||
  'mongodb+srv://read:read@pokelab-jinhn.mongodb.net/task';

app.use(cors());

app.get('/', (req, res) => res.json({ api_version: '1.0.0' }));

app.get('/tasks/:title', async (req, res) => {
  try {
    const taskDb = await db
      .collection('task')
      .find()
      .toArray();
    const taskReceived = taskDb.filter(task =>
      task.title.toLowerCase().includes(req.params.title.toLowerCase())
    );
    res.json(taskReceived);
  } catch (err) {
    res.json({ error: 'Task not found.' });
  }
});

app.get('/tasks', async (req, res) => {
  const task = await db
    .collection('task')
    .find()
    .toArray();

  res.json(task);
});

(async () => {
  try {
    const client = await MongoClient.connect(url, {
      poolSize: 20,
      useNewUrlParser: true
    });

    global.db = client.db('task-app');

    const port = process.env.PORT || 3030;
    app.listen(port, () => {
      app.emit('ready');
      console.log(`API is Running on Port ${port}`);
    });
  } catch (err) {
    console.log(err.stack);
  }
})();
