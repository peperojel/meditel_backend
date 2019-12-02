'use strict'

const moment = require('moment');
const Task = use('Task');
const firebase = use('FirebaseAdmin');

class Notificador extends Task {
  static get schedule () {
    return '* * * * *'
  }

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
