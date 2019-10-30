'use strict'

const Route = use('Route');

module.exports = () => {

    Route.post('create', 'AsesoriaController.create').middleware('jwtAuth');
    Route.get('asesorias', 'AsesoriaController.getAsesorias').middleware('jwtAuth');
    //Route.get('show/:id', 'PacienteController.getInfo').middleware('jwtAuth');
    Route.post('cancelar', 'AsesoriaController.deleteAsesoria').middleware('jwtAuth');
    //Route.get('all', 'DoctorController.getDoctors').middleware('jwtAuth');
} 