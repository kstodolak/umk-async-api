import express from 'express';
import { questions } from './questions.js';

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/questions', (req, res) => {
  if (req.query.id) {
    return res.status(404).send('No question found');
  }

  return res.status(200).send(questions);
});

app.get('/status/:status', (req, res) => {
  if (req.params.status === '200') {
    return res.status(200).send({ message: 'Success. Status code: 200' });
  }

  if (req.params.status === '404') {
    return res.status(404).send({ message: 'Not Found. Status code: 404' });
  }

  return res.status(500).send('Error');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});