'use strict'

const Route = use('Route');

module.exports = () => {

    Route.post('create', 'HistorialController.create').middleware('jwtAuth');
    Route.get('comentarios/:id', 'HistorialController.getComentarios').middleware('jwtAuth');
    Route.post('final', 'HistorialController.final').middleware('jwtAuth');
    Route.get('historial', 'HistorialController.getHistorial').middleware('jwtAuth');
}