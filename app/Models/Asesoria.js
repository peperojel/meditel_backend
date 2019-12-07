'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Asesoria extends Model {
  static boot () {
    super.boot();
    this.addHook('beforeCreate', 'AsesoriaHook.setDefaults');
    // this.addHook('beforeSave' , 'AsesoriaHook.fixFecha2');
    this.addHook('afterFetch' , 'AsesoriaHook.fixFecha');
  }

  static castDates(field, value) {
    if (field === 'fecha') {
      return value.format('DD-MM-YYYY HH:mm:ss')
    }
  }

  messages () {
    return this.hasMany('App/Models/ChatMessage');
  }

}

module.exports = Asesoria
