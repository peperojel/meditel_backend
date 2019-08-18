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
      'email.required': 'Debe ingresar un correo',
      'email.email': 'El correo ingresado no es válido',
      'email.unique': 'Este correo ya se encuentra registrado',
      'password.required': 'Debe escribir una contraseña para su cuenta',
      'password.min': 'La contraseña debe tener al menos 6 caracteres.',
      'role.required' : 'Se debe ingresar un rol para hacer el registro'
    }
  }

  async fails (errors) {
    return this.ctx.response.status(400).json(errors);
  }
}

module.exports = Register
