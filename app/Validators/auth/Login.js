'use strict'

class Login {
  get rules () {
    return {
      email: 'required|email',
      password: 'required'
    }
  }

  get data () {
    const requestBody = this.ctx.request.all();
    requestBody.email = (requestBody.email) ? requestBody.email.trim().toLowerCase() : null;
    return requestBody;
  }

  get messages () {
    return {
      'email.required': 'Debes ingresar un correo',
      'email.email': 'El correo ingresado no es válido',
      'password.required': 'Debes ingresar una contraseña'
    }
  }

  async fails (errors) {
    return this.ctx.response.status(400).json(errors);
  }
}

module.exports = Login;
