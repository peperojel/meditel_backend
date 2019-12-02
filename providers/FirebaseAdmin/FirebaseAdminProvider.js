'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const FirebaseAdmin = require('./FirebaseAdmin')

class FirebaseAdminProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this.app.singleton('App/FirebaseAdmin', () => {
      const Config = this.app.use('Adonis/Src/Config')
      const config = {
        credential: Config.get('firebase.credential'),
        databaseURL: Config.get('firebase.databaseURL')
      }
      return new FirebaseAdmin(config)
    })
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    this.app.alias('App/FirebaseAdmin', 'FirebaseAdmin')
  }
}

module.exports = FirebaseAdminProvider
