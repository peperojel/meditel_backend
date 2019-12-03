'use strict'
const Doctor = use('App/Models/Doctor');
const Database = use('Database');
const User = use('App/Models/User');
const Paciente =use('App/Models/Paciente');
const Asesoria =use('App/Models/Asesoria');
const Agenda =use('App/Models/Agenda');

class AgendaController {

    async create ({ request, response , auth }) {

        const bloquesBruto = request.all()
        const doctor_data = auth.user.doctors().fetch()
        const idDoctor = doctor_data.id_doctor;
        const bloquesReady = Object.keys(bloquesBruto).map( (key) => {
            var json_ready = {
                startDate: bloquesBruto[key].startDate,
                endDate: bloquesBruto[key].endDate,
                doctor_id: idDoctor
            }
            return json_ready
        });

        try {
            await Agenda.query().where({id_doctor:idDoctor}).delete();
            await Agenda.createMany(bloquesReady);
            return response.status(201).json({
                message: "Bloque de agenda se ha creado exitosamente "
            });
        } catch (error) {
            return response.status(500).json({
                message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
                error
            });
        }
    }

    async getAgenda ({params, response}) {
        try {
            const data = await Agenda.query().select( 'startDate','endDate')
                .where({id_doctor:params.id}).fetch();
            return response.status(201).json({data});
            } catch (error) {
                return response.status(500).json({
                    message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
                    error
                  });
              }
            
    }
}

module.exports = AgendaController
