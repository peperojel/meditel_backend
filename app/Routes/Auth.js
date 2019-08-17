'use strict'

const Route = use('Route');

module.exports = () => {

    Route.post('register', 'AuthController.register');//.validator('auth/Signup')

}