'use strict'

const Route = use('Route');

module.exports = () => {

    Route.post('create', 'AgendaController.create').middleware('jwtAuth');
    Route.get('disponibilidad/:id', 'AgendaController.getAgenda').middleware('jwtAuth');
   

}