import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("sports").del();

    let testSports = [
        {
            name: 'BASEBALL',
            codeName: 'baseball',
            createdAt: Date.now(),
            updatedAt: Date.now()
        },
        {
            name: 'BASKETBALL',
            codeName: 'basketball',
            createdAt: Date.now(),
            updatedAt: Date.now()
        },
        {
            name: 'FOOTBALL',
            codeName: 'football',
            createdAt: Date.now(),
            updatedAt: Date.now()
        },
        {
            name: 'BOXING',
            codeName: 'boxing',
            createdAt: Date.now(),
            updatedAt: Date.now()
        },
        {
            name: 'CYCLING',
            codeName: 'cycling',
            createdAt: Date.now(),
            updatedAt: Date.now()
        },
        {
            name: 'FITNESS',
            codeName: 'fitness',
            createdAt: Date.now(),
            updatedAt: Date.now()
        },
        {
            name: 'GOLF',
            codeName: 'golf',
            createdAt: Date.now(),
            updatedAt: Date.now()
        },
        {
            name: 'RUNNING',
            codeName: 'running',
            createdAt: Date.now(),
            updatedAt: Date.now()
        },
        {
            name: 'SWIMMING',
            codeName: 'swimming',
            createdAt: Date.now(),
            updatedAt: Date.now()
        },
        {
            name: 'TENNIS',
            codeName: 'tennis',
            createdAt: Date.now(),
            updatedAt: Date.now()
        },
        {
            name: 'TRIATHLON',
            codeName: 'triathlon',
            createdAt: Date.now(),
            updatedAt: Date.now()
        },
        {
            name: 'VOLLEYBALL',
            codeName: 'volleyball',
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
    ]

    await knex("sports").insert(testSports);
};
