'use strict'

const HistorialHook = exports = module.exports = {}

HistorialHook.setDefaults = async (historialInstance) => {
    historialInstance.ev_pac = 5.0;
    historialInstance.ev_doc = 5.0;
    historialInstance.com_pac = "Sin comentarios";
    historialInstance.com_doc = "Sin comentarios";
    historialInstance.diagnostico = "Sin comentarios";

}