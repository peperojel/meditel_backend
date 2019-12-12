'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AsesoriasSchema extends Schema {
  up () {
    this.create('asesorias', (table) => {
      table.increments();
      table.string('id_asesoria').index('id_asesoria');
      table.string('id_doctor').references('id_doctor').inTable('doctors');
      table.string('id_paciente').references('id_paciente').inTable('pacientes');
      table.int('fecha');
      table.integer('ev_pac')
      table.integer('ev_doc')
      table.string('com_doc')
      table.string('com_pac')
      table.string('diagnostico')
      table.string('estado')
      table.boolean('notificado')
      table.string('motivo')
      table.timestamps();
    })
  }

  down () {
    this.drop('asesorias')
  }
}

module.exports = AsesoriasSchema
