'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Paciente extends Model {
  static boot () {
    super.boot();
    this.addHook('beforeCreate', 'PacienteHook.setDefaults');
  }
  
  static get dates() {
    return super.dates.concat(['nacimiento'])
  }
      
  static castDates(field, value) {
    if (field === 'nacimiento') {
      return value.format('DD-MM-YYYY')
    }
  }

  asesorias () {
    return this.hasMany('App/Models/Asesoria');
  }
}

module.exports = Paciente
