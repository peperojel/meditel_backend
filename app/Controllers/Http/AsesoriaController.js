'use strict'
const Doctor = use('App/Models/Doctor');
const Database = use('Database');
const User = use('App/Models/User');
const Paciente =use('App/Models/Paciente');
const Asesoria =use('App/Models/Asesoria');

class AsesoriaController {
    async create ({ request, response , auth }) {
        const user = await auth.getUser();
    // Cargar al paciente cuyo user_id coincide con user.id
        const paciente_data = await Database
        .table('pacientes')
        .where('user_id', user.id)
        .first();
        
        const idPaciente = paciente_data.id_paciente;
        const { id_doctor, fecha } = request.all();
        
        const asesoria = new Asesoria();
        asesoria.id_doctor = id_doctor;
        asesoria.id_paciente= idPaciente;
        asesoria.fecha=fecha;
        try {
          await asesoria.save();
          return response.status(201).json({
            message: "Asesoria agendada exitosamente "
        });
        } catch (error) {
            return response.status(500).json({
              message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
              error
            });
        }
      }
      async deleteAsesoria ({ request, response,auth }) {
        const { id_asesoria } = request.all();
        const asesoria = await Asesoria.findBy('id_asesoria', id_asesoria);
        const user = await auth.getUser();
        const role= user.role;
        if (role == 'medico') {
            // Cargar al médico cuyo user_id coincide con user.id
            const doctor_data = await Database
            .table('doctors')
            .where('user_id', user.id)
            .first();
            const idDoctor = doctor_data.id_doctor;
            if(asesoria.id_doctor==idDoctor){
                try {
                    await asesoria.delete();
                    return response.status(201).json({
                        message: 'Asesoría eliminada exitosamente.',
                  });
                  } catch (error) {
                      return response.status(500).json({
                        message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
                        error
                      });
                  }
                

            }
        }
        if (role == 'paciente') {
            // Cargar al paciente cuyo user_id coincide con user.id
            const paciente_data = await Database
            .table('pacientes')
            .where('user_id', user.id)
            .first();
            const idPaciente = paciente_data.id_paciente;
            if(asesoria.id_paciente==idPaciente){
                try {
                    await asesoria.delete();
                    return response.status(201).json({
                        message: 'Asesoría eliminada exitosamente.',
                  });
                  } catch (error) {
                      return response.status(500).json({
                        message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
                        error
                      });
                  }
                

            }
        }
       
      
      }
      async getAsesorias ({response, auth }) {
        const user = await auth.getUser();
        const role= user.role;
        if (role == 'medico') {
            // Cargar al médico cuyo user_id coincide con user.id
            const doctor_data = await Database
            .table('doctors')
            .where('user_id', user.id)
            .first();
            const idDoctor = doctor_data.id_doctor;
            try {
                const data = await Asesoria.query().select('nombre', 'apellido', 'fecha', 'id_asesoria')
            .innerJoin('pacientes','asesorias.id_paciente', 'pacientes.id_pacientes').where('id_doctor',idDoctor)
            .innerJoin('users','pacientes.user_id', 'users.id').fetch();
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
        if (role == 'paciente') {
            // Cargar al paciente cuyo user_id coincide con user.id
            const paciente_data = await Database
            .table('pacientes')
            .where('user_id', user.id)
            .first();
            const idPaciente = paciente_data.id_paciente;
            try {
                const data = await Asesoria.query().select('nombre', 'apellido', 'fecha', 'id_asesoria')
            .innerJoin('doctors','asesorias.id_doctor', 'doctors.id_doctor').where('id_paciente',idPaciente)
            .innerJoin('users','doctors.user_id', 'users.id').fetch();
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




}

module.exports = AsesoriaController
