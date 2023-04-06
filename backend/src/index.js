require('dotenv').config();
const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const { connection } = require('./database/database');

const app = express();

app.use(express.static('../frontend/dist'));

try {
  connection.authenticate();
  console.log('[ MYSQL ] - MySQL conectado com sucesso.');
} catch (err) {
  console.log(err);
}

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10MB' }));
app.use(routes);

app.get('*', (req, res) => {
  res.sendFile('/frontend/dist/index.html', { root: '../' });
});

app.listen(3333, () => {
  console.log('[ SERVER ] - Servidor rodando na porta 3333.');
});
