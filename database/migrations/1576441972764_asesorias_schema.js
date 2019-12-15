'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AsesoriasSchema extends Schema {
  up () {
    this.table('asesorias', (table) => {
      table.boolean('notificado');
      table.string('motivo');
    })
  }

  down () {
    this.table('asesorias', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AsesoriasSchema
