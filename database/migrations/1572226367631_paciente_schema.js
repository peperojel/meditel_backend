'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PacienteSchema extends Schema {
  up () {
    this.create('pacientes', (table) => {
      table.increments();
      table.timestamps();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.string('id_paciente').index('id_paciente');
      table.float('rating', 2,2);
      table.string('nacionalidad');
      table.date('nacimiento');

    })
  }

  down () {
    this.drop('pacientes')
  }
}

module.exports = PacienteSchema
