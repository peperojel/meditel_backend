'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Asesoria extends Model {
    static boot () {
        super.boot();
        this.addHook('beforeCreate', 'AsesoriaHook.setDefaults');
        // this.addHook('beforeSave' , 'AsesoriaHook.fixFecha2')
        this.addHook('afterFetch' , 'AsesoriaHook.fixFecha');
    }
    static castDates(field, value) {
      if (field === 'fecha') {
        return value.format('DD-MM-YYYY HH:mm:ss')
      }
    }
    pacientes () {
        return this.hasMany('App/Models/Paciente');
      }
    doctors () {
        return this.hasMany('App/Models/Doctor');
      }
}

module.exports = Asesoria
