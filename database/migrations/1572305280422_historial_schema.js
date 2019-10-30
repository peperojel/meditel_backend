'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HistorialSchema extends Schema {
  up () {
    this.create('historials', (table) => {
      table.increments()
      table.string('id_asesoria').notNullable()
      table.string('id_doctor').references('id_doctor').inTable('doctors').onDelete('CASCADE')
      table.string('id_paciente').references('id_paciente').inTable('pacientes').onDelete('CASCADE')
      table.date('fecha')
      table.integer('ev_pac')
      table.integer('ev_doc')
      table.string('com_doc')
      table.string('com_pac')
      table.string('diagnostico')
      table.timestamps()
    })
  }

  down () {
    this.drop('historials')
  }
}

module.exports = HistorialSchema
