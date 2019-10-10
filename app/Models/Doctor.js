'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Doctor extends Model {
    static boot () {
        super.boot();
        this.addHook('beforeCreate', 'DoctorHook.setDefaults');
      }

    
  calendars () {
        return this.hasMany('App/Models/Calendar');
  }

}

module.exports = Doctor
