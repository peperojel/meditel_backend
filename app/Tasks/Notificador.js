'use strict'

const moment = require('moment');
const Task = use('Task')

class Notificador extends Task {
  static get schedule () {
    return '* * * * *'
  }

  async handle () {
    console.log(moment().utcOffset("-03:00").format('YYYY-MM-DD HH:mm:ss'))
  }
}

module.exports = Notificador
