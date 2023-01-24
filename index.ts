import express, { Express } from 'express';
import dotenv from 'dotenv';
import "reflect-metadata"

//import routes
import {userRoutes} from './src/routes/user'
import {userMiddleware} from './src/middlewares/user'

dotenv.config();
const app: Express = express();

//middleware registry
app.use('/user', userMiddleware);

//Route registry
app.use('/user', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`);
});