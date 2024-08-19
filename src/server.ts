import express from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors';

async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.blue("Conexión exitosa a la DB"))
  } catch (error) {
    console.log(colors.red.bold("🚀 ~ connectDB ~ error:"))
  }
}

connectDB();
const server = express();

server.use(express.json())
server.use('/api/products', router);

export default server;