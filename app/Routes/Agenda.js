'use strict'

const Route = use('Route');

module.exports = () => {

    Route.post('create', 'AgendaController.create').middleware('jwtAuth');
    Route.get('bloques', 'AgendaController.getAgenda').middleware('jwtAuth');
    Route.post('delete/:id', 'AgendaController.deleteBloque').middleware('jwtAuth');
    //Route.post('estado', 'DoctorController.changeEstado').middleware('jwtAuth');

}