'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Agenda extends Model {
    static boot () {
        super.boot();
        this.addHook('beforeCreate', 'AgendaHook.setDefaults');
    }
}

module.exports = Agenda