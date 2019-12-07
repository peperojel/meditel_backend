'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatMessageSchema extends Schema {
  up () {
    this.create('chat_messages', (table) => {
      table.increments();
      table.string('id_asesoria').references('id_asesoria').inTable('asesorias');
      table.string('id_user').references('uid').inTable('users');
      table.string('type');
      table.string('content', ['2047']);
      table.string('created_at');
    })
  }

  down () {
    this.drop('chat_messages')
  }
}

module.exports = ChatMessageSchema
