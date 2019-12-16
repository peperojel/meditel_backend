'use strict'

const moment = require('moment');
const AsesoriaHook = exports = module.exports = {}

AsesoriaHook.setDefaults = async (asesoriaInstance) => {
    if( typeof asesoriaInstance.fecha === 'undefined' ) {
        asesoriaInstance.fecha = moment().utcOffset("-03:00").format();
    }
    asesoriaInstance.ev_pac = 5.0;
    asesoriaInstance.ev_doc = 5.0;
    asesoriaInstance.com_pac = "Sin comentarios";
    asesoriaInstance.com_doc = "Sin comentarios";
    asesoriaInstance.diagnostico = "Sin comentarios";
    asesoriaInstance.notificado = false;
    if( typeof asesoriaInstance.id_asesoria === 'undefined' ) {
        asesoriaInstance.id_asesoria = Math.random().toString(18).substr(2, 8);
    }
    if( typeof asesoriaInstance.estado === 'undefined' ) {
        asesoriaInstance.estado = "futura";
    }
    
}

/*
Transforma a zona horaria chilena el datetime de un batch de asesorías
*/
AsesoriaHook.fixFecha = async (asesoriaArray) => {
    var newArray = asesoriaArray.map( (item) => {
        item.fecha = moment(item.fecha + ' -03:00', "YYYY-MM-DD HH:mm:ss Z").utcOffset("-03:00").format()
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
