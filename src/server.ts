import express from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';

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

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
      if(origin === process.env.FRONTEND_URL) {
        callback(null, true);
      } else {
        callback(new Error('Error de cors'), false);
      }
  }
}
server.use(cors(corsOptions))
server.use(express.json())
server.use(morgan('dev'))
server.use('/api/products', router);

export default server;