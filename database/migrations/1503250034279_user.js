'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('uid').notNullable().index()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('role')
      table.boolean('verified').defaultTo(false)
      table.string('confirmation_token')
      table.string('nombre')
      table.string('apellido')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
