'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Doctor extends Model {
    static boot () {
        super.boot();
        this.addHook('beforeCreate', 'DoctorHook.setDefaults');
    }
    
    agenda () {
        return this.hasMany('App/Models/Agenda');
      }
    
    asesorias () {
        return this.hasMany('App/Models/Asesoria', 'id_doctor', 'id_doctor');
    }

    user () {
        return this.belongsTo('App/Models/User');
    }
}

module.exports = Doctor
