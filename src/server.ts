import express from 'express';
import router from './router';
import db from './config/db';

async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log("Conexión exitosa a la DB")
  } catch (error) {
    console.log("🚀 ~ connectDB ~ error:", error)
  }
}

connectDB();
const server = express();

server.use('/api/products', router);

export default server;