'use strict'

const Route = use('Route');

module.exports = () => {

    Route.post('create', 'AsesoriaController.create').middleware('jwtAuth');
    Route.get('asesorias', 'AsesoriaController.getAsesorias').middleware('jwtAuth');
    Route.post('cancelar', 'AsesoriaController.deleteAsesoria').middleware('jwtAuth');
    Route.get('comentarios/:id', 'AsesoriaController.getComentarios').middleware('jwtAuth');
    Route.post('final', 'AsesoriaController.final').middleware('jwtAuth');
    Route.get('historial', 'AsesoriaController.getHistorial').middleware('jwtAuth');
    Route.get('agendados/:id', 'AsesoriaController.getAgendados').middleware('jwtAuth');
    Route.post('diagnosticar', 'AsesoriaController.diagnosticar').middleware('jwtAuth');
} 