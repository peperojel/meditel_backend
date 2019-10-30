'use strict'

const PacienteHook = exports = module.exports = {}

PacienteHook.setDefaults = async (pacienteInstance) => {
    pacienteInstance.id_paciente = Math.random().toString(18).substr(2, 8);
    pacienteInstance.rating = 0.0;
}