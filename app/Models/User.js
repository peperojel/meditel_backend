'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot();
    this.addHook('beforeSave', 'UserHook.hashPassword');
    this.addHook('beforeCreate', 'UserHook.setDefaults');
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token');
  }

  doctors () {
    return this.hasOne('App/Models/Doctor');
  }

  // roles
  static get roles () {
    return ['superadmin', 'admin', 'paciente', 'medico'];
  }

  // hide fields
  static get hidden () {
    return ['password', 'confirmation_token'];
  }
}

module.exports = User
