import { Knex } from "knex";
require('dotenv').config();

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('class_user_comments', function (table) {
        table.bigIncrements('id');
        table.bigInteger('userId').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.bigInteger('classId').unsigned().references('id').inTable('classes').onDelete('CASCADE');
        table.text('comment');
        table.bigInteger('createdAt');
        table.bigInteger('updatedAt');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('class_user_comments')
}

