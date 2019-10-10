'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CalendarSchema extends Schema {
  up () {
    this.create('calendars', (table) => {
      table.increments()
      table.integer('doctor_id').unsigned().references('id_doctor').inTable('doctors').onDelete('CASCADE');
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

module.exports = CalendarSchema
