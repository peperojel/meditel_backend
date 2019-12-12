'use strict'

const moment = require('moment');
const Task = use('Task');
const firebase = use('FirebaseAdmin');
// Sumar Mail

class Notificador extends Task {
  static get schedule () {
    return '* * * * *'
  }

  // Query que trae las asesorías en estado futuro y que no han sido notificadas.
  // Donde la condición de "por comenzar" se obtendrá a través de el campo
  // fecha, el cual será un entero. Para obtener la fecha de referencia se obtiene la fecha actual y se le suman 10 minutos
  // Devuelve results

  // Sacar id_paciente e id_medico para cada elemento de result
  // Enviar correo a id_medico (User y saco su correo)
    // Contenido:
    //  Lo anotó Stephi
  // Enviar notificación push a id_paciente (a través de User->FirebaseToken)

  // A results se le cambian las siguientes entradas:
  //  notificada: true
  //  estado: "en espera"

  // Anexo: Sacar la fecha actual 
  // moment().addMinutes(10).unix()
  async handle () {
    var registrationToken = 'd5plqQwal6M:APA91bG__3EgMQvKwn7IAAj9i-bfbiRAV201OY9PZrzeYLeW5aRTi0uvojs8hOC1euqj9ao4pAk7wrQaEMCd4cVFNcYY4lXYJ6p5vmlHrIo-RK12MxKjlE1zapZ825uNcj-g8a_d79oi';

    var message = {
      notification: {
        title:"Bienvenido a MediTel!",
        body:"Agenda tu primera asesoría"
      },
      token: registrationToken
    };

    firebase.messaging().send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
    console.log(moment().utcOffset("-03:00").format('YYYY-MM-DD HH:mm:ss'))
  }
}

module.exports = Notificador
