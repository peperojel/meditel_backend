'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Asesoria extends Model {
    static boot () {
        super.boot();
        this.addHook('beforeCreate', 'AsesoriaHook.setDefaults');
    }
    pacientes () {
        return this.hasMany('App/Models/Paciente');
      }
    doctors () {
        return this.hasMany('App/Models/Doctor');
      }
}

module.exports = Asesoria
