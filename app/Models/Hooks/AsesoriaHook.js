'use strict'

const AsesoriaHook = exports = module.exports = {}

AsesoriaHook.setDefaults = async (asesoriaInstance) => {
    asesoriaInstance.id_asesoria = Math.random().toString(18).substr(2, 8);
    asesoriaInstance.ev_pac = 5.0;
    asesoriaInstance.ev_doc = 5.0;
    asesoriaInstance.com_pac = "Sin comentarios";
    asesoriaInstance.com_doc = "Sin comentarios";
    asesoriaInstance.diagnostico = "Sin comentarios";
    asesoriaInstance.estado = "futura";
}