'use strict'

const AgendaHook = exports = module.exports = {}

AgendaHook.setDefaults = async (agendaInstance) => {
    agendaInstance.id_bloque = Math.random().toString(18).substr(2, 8);
}
