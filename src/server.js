require('dotenv').config();
const { db } = require('./database/config');
const app = require('./app');
const initModel = require('./models/initModels');

const Sockets = require('./sockets/index');
db.authenticate()
  .then(() => {
    console.log('Database connected 😀');
  })
  .catch((err) => {
    console.log('Error connecting to database 😞', err);
  });
initModel();
db.sync({
  force: false,
})
  .then(() => {
    console.log('Database synced 😁');
  })
  .catch((err) => {
    console.log('Error syncing database 😞', err);
  });

// Se agrega el puerto desde las variables de entorno -😁
const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
