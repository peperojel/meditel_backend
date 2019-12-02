'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FirebaseTokenSchema extends Schema {
  up () {
    this.create('firebase_tokens', (table) => {
      table.increments()
      table.string('user_id').references('uid').inTable('users').onDelete('CASCADE')
      table.string('token').unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('firebase_tokens')
  }
}

module.exports = FirebaseTokenSchema
