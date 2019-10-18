'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AgendaSchema extends Schema {
  up () {
    this.create('agenda', (table) => {
      table.increments();
      table.string('id_doctor').references('id_doctor').inTable('doctors').onDelete('CASCADE');;
      table.string('id_bloque');
      table.date("startDate");
      table.date("endDate");
      table.boolean("disponible");
      table.timestamps();
    })
  }

  down () {
    this.drop('agenda')
  }
}

module.exports = AgendaSchema
