'use strict'

const moment = require('moment');
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

/*
Transforma a zona horaria chilena el datetime de un batch de asesorías
*/
AsesoriaHook.fixFecha = async (asesoriaArray) => {
    var newArray = asesoriaArray.map( (item) => {
        item.fecha = moment(item.fecha).utcOffset("-03:00").format()
    })

    return newArray
}

/*
Transforma a zona horaria chilena la fecha de una instancia de asesoría
*/
AsesoriaHook.fixFecha2 = async (asesoriaInstance) => {
    asesoriaInstance.fecha = moment(asesoriaInstance.fecha, "YYYY-MM-DD HH:mm:ss")
        .utcOffset("-03:00")
        .format("YYYY-MM-DD HH:mm:ss")
}
