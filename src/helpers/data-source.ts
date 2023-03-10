import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entity/User"
import { Class } from "../entity/Class";
import { Sport } from "../entity/Sport";
import { ClassUser } from "../entity/ClassUser";
import { ClassUserComments } from "../entity/ClassUserComments";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DOCKER_DB_HOST || process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [User, Class, Sport, ClassUser, ClassUserComments],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize()
    .then(() => {
        // ...
    }).catch((error) => console.log(error))
