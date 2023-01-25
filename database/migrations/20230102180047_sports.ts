import { Knex } from "knex";
require('dotenv').config();

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('sports', function (table) {
        table.bigIncrements('id');
        table.string('name', 255).notNullable();
        table.string('codeName', 255).index().unique().notNullable();
        table.bigInteger('createdAt');
        table.bigInteger('updatedAt');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('createTable')
}

