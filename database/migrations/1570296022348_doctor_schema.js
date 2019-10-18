'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DoctorSchema extends Schema {
  up () {
    this.create('doctors', (table) => {
      table.increments();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.string('id_doctor').index('id_doctor');
      table.string('specialty');
      table.float('rating', 2,2);
      table.boolean('disponible');
      table.timestamps();
    })
  }

  down () {
    this.drop('doctors')
  }
}

module.exports = DoctorSchema
