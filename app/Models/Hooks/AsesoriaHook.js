'use strict'

const AsesoriaHook = exports = module.exports = {}

AsesoriaHook.setDefaults = async (asesoriaInstance) => {
    asesoriaInstance.id_asesoria = Math.random().toString(18).substr(2, 8);
}