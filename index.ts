import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import "reflect-metadata"
dotenv.config();

const app: Express = express();

import { AppDataSource } from "./src/data-source"
import { User } from "./src/entity/User"

async function index(req: Request, res: Response) {

    const userRepo = await AppDataSource.getRepository(User).createQueryBuilder('users').where(`users.id = :id`, {id: 1}).getOne()
    console.log(userRepo)
  res.send('Hello World');
}

//routes
app.get('/', index);


app.listen(process.env.PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`);
});