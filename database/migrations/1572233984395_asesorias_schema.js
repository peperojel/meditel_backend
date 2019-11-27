'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AsesoriasSchema extends Schema {
  up () {
    this.create('asesorias', (table) => {
      table.increments();
      table.string('id_asesoria').index('id_asesoria');
      table.string('id_doctor').references('id_doctor').inTable('doctors').onDelete('CASCADE');
      table.string('id_paciente').references('id_paciente').inTable('pacientes').onDelete('CASCADE');
      table.date('fecha');
      table.timestamps();
    })
  }

  down () {
    this.drop('asesorias')
  }
}

module.exports = AsesoriasSchema