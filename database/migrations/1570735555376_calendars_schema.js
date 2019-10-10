'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CalendarsSchema extends Schema {
  up () {
    this.create('calendars', (table) => {
      table.increments();
      table.integer('doctor_id').unsigned().references('doctor_id').inTable('doctors').onDelete('CASCADE');
      table.date('date');
      table.time('hour');
      table.boolean('available_hour');
      table.timestamps();
    })
  }

  down () {
    this.drop('calendars')
  }
}

module.exports = CalendarsSchema
