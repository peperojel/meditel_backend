'use strict'
const Doctor = use('App/Models/Doctor');
const Database = use('Database');
const User = use('App/Models/User');
const Paciente =use('App/Models/Paciente');
const Asesoria =use('App/Models/Asesoria');
const Agenda =use('App/Models/Agenda');

class AgendaController {

    async create ({ request, response , auth }) {
        const user = await auth.getUser();
    // Cargar al médico cuyo user_id coincide con user.id
        const doctor_data = await Database
        .table('doctors')
        .where('user_id', user.id)
        .first(); 
        const idDoctor = doctor_data.id_doctor;
        //const { data } = request.all();
        await Agenda.query().where({id_doctor:idDoctor}).delete();

        //const agenda = new Agenda();
        //agenda.id_doctor = idDoctor;
        //agenda.startDate = data.startDate;
        //agenda.endDate = data.endDate;
        try {
          //await agenda.save();
          const usersData = request.collect(['id_doctor','startDate', 'endDate']);
          await Agenda.createMany(usersData);
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
            return response.status(201).json({
                data
            });
            } catch (error) {
                return response.status(500).json({
                    message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
                    error
                  });
              }
            
      }      
   
}

module.exports = AgendaController
