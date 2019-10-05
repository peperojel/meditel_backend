'use strict'

const Route = use('Route');

module.exports = () => {

    Route.post('create', 'DoctorController.create').middleware('jwtAuth');
    Route.get('disponibles', 'DoctorController.getDisponibles').middleware('jwtAuth');
    Route.get('show/:id', 'DoctorController.getInfo').middleware('jwtAuth');

}