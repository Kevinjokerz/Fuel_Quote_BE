import express from "express";
import 'express-async-errors';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import apiRouter from './routes';
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

  export default app;