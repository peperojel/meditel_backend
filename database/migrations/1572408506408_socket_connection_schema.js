'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SocketConnectionSchema extends Schema {
  up () {
    this.create('socket_connections', (table) => {
      table.increments()
      table.string('id_user').references('uid').inTable('users').onDelete('CASCADE')
      table.string('id_socket')
      table.string('topic')
      table.string('role')
      table.boolean('is_ready')
      table.timestamps()
    })
  }

  down () {
    this.drop('socket_connections')
  }
}

module.exports = SocketConnectionSchema
