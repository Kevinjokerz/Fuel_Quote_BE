import express from "express";
import 'express-async-errors';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import apiRouter from './routes';
import mongoose from "mongoose";
import  {errorHandler, morganMiddleware} from './middlewares'



const app = express()

// Cors configs
const options: CorsOptions = {
    origin: '',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: '',
    credentials: true,
  };
  app.use(cors(options));
  app.use(helmet());
  app.use(express.json())
  app.use(morganMiddleware);
  app.use('/api', apiRouter);
  app.use(errorHandler);

const start = async ()=>{
  await mongoose.connect("mongodb://localhost:27017");
// await mongoose.connect("mongodb+srv://khoi123:khoi123@cluster0.fystvan.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
  app.listen(3000,()=>{console.log("app start")})
}

start();