'use strict'

class Register {
  get rules () {
    return {
      email: 'required|email|unique:users',
      password: 'required|min:6',
      role: 'required'
    }
  }

  get messages () {
    return {
      'email.required': 'Enter email address to be used for login',
      'email.email': 'Email address is not valid',
      'email.unique': 'There\'s already an account with this email address',
      'password.required': 'Choose password for your account',
      'password.min': 'Password needs to be at least 6 characters long.',
      'role.required' : 'Debes indicar un rol al momento de registrarte!'
    }
  }

}

module.exports = Register
