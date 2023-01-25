import { Knex } from "knex";
require('dotenv').config();

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('class_users', function (table) {
        table.bigIncrements('id');
        table.bigInteger('userId').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable();
        table.bigInteger('classId').unsigned().references('id').inTable('classes').onDelete('CASCADE').notNullable();
        table.integer('rating', 1).index();
        table.bigInteger('createdAt');
        table.bigInteger('updatedAt');
        table.unique(['userId', 'classId']);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('class_users')
}

