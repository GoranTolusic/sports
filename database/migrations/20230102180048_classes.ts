import { Knex } from "knex";
require('dotenv').config();

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('classes', function (table) {
        table.bigIncrements('id');
        table.string('description', 255).notNullable().index();
        table.bigInteger('sportId').unsigned().references('id').inTable('sports').onDelete('CASCADE');
        table.enum('ageLevel', ['children', 'youth', 'youngAdults', 'adults', 'notSet']).defaultTo('notSet').index();
        table.enum('duration', ['oneHour', 'twoHour', 'threeHour']).index();
        table.bigInteger('start');
        table.bigInteger('end');
        table.bigInteger('createdAt');
        table.bigInteger('updatedAt');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('classes')
}

