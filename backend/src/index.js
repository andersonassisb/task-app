require('dotenv').config();
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const url =
  process.env.MONGO_URL ||
  'mongodb+srv://read:read@pokelab-jinhn.mongodb.net/task';

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => res.json({ api_version: '1.0.0' }));

app.post('/tasks/insert', (req, res) => {
  const { title, content, status } = req.body;

  const newTask = {
    title: title ? title : '',
    content: content ? content : '',
    status: status ? status : false
  };

  if (!newTask.title) {
    res.status(400);
    res.json({ error: 'Task title undefined' });
  } else {
    const insertTask = db.collection('task').insertOne(newTask);
    if (insertTask) {
      res.json({ newTask });
    } else {
      res.json({ error: 'Unable to save to database' });
    }
  }
});

/*app.get('/tasks/:title', async (req, res) => {
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
});*/

app.post('/tasks/delete', async (req, res) => {
  const { id } = req.body;

  db.collection('task', (err, collection) => {
    collection.deleteOne({ _id: new mongo.ObjectId(id) }, (err, result) => {
      if (!err) {
        res.status(200);
        res.json({ delete: true });
      } else {
        res.status(400);
        res.json({ delete: false });
      }
    });
  });
});

app.get('/tasks/delete_all', async (req, res) => {
  db.collection('task', (err, collection) => {
    collection.deleteMany({}, (err, result) => {
      if (!err) {
        res.status(200);
        res.json({ deleteAll: true });
      } else {
        res.status(400);
        res.json({ deleteAll: false });
      }
    });
  });
});

app.post('/tasks/edit', async (req, res) => {
  const { id } = req.body;

  db.collection('task', (err, collection) => {
    collection.updateOne({ _id: new mongo.ObjectId(id) }, (err, result) => {
      if (!err) {
        res.status(200);
        res.json({ update: true });
      } else {
        res.status(400);
        res.json({ update: false });
      }
    });
  });
});

/*app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params.id;
  const taskDb = await db
    .collection('task')
    .find()
    .toArray();
  const taskReceived = taskDb.filter(task => task._id.includes(req.params.id));
  console.log(taskReceived);
});*/

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
