'use strict'
const Doctor = use('App/Models/Doctor');
const Database = use('Database');
const User = use('App/Models/User');
const Paciente =use('App/Models/Paciente');
const Asesoria =use('App/Models/Asesoria');
const SocketConnection = use('App/Models/SocketConnection')

class AsesoriaController {

    async create ({ request, response , auth }) {
    // Cargar al paciente cuyo user_id coincide con user.id
        const paciente_data = await Database
        .table('pacientes')
        .where('user_id', auth.user.id)
        .first();
        
        const idPaciente = paciente_data.id_paciente;
        const { id_doctor, fecha } = request.all();
        
        const asesoria = new Asesoria();
        asesoria.id_doctor = id_doctor;
        asesoria.id_paciente = idPaciente;
        asesoria.fecha = fecha;
    
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
                const appointment = await Asesoria.query().select('pacientes.id_paciente','nombre', 'apellido', 'fecha', 'id_asesoria')
                    .innerJoin('pacientes','asesorias.id_paciente', 'pacientes.id_paciente').where({id_doctor:idDoctor, estado:'futura'})
                    .innerJoin('users','pacientes.user_id', 'users.id').fetch();
       
                return response.status(201).json( {appointment} );
            } catch (error) {
                console.log(error)
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
                const data = await Asesoria.query().select('doctors.id_doctor','nombre', 'apellido', 'fecha', 'id_asesoria')
                    .innerJoin('doctors','asesorias.id_doctor', 'doctors.id_doctor').where({id_paciente: idPaciente, estado:'futura'})
                    .innerJoin('users','doctors.user_id', 'users.id').fetch();
                return response.status(201).json( {data} );
              } catch (error) {
                  return response.status(500).json({
                    message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
                    error
                  });
              }
            
        }
    }

    async final ({ request, response , auth }) {
        const user = await auth.getUser();
        const role= user.role;
        const { id_asesoria,rating,comentario } = request.all();
        const historial = await Asesoria.findBy('id_asesoria', id_asesoria);
        historial.estado="pasada";
        if (role == 'medico') {
            
            historial.ev_pac = rating;
            historial.com_pac = comentario;
            try {
                await historial.save();             
            return response.status(201).json({
                message: 'Paciente evaluado y diagnosticado exitosamente'
            });
              } catch (error) {
                  return response.status(500).json({
                    message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
                    error
                  });
              }
            
        }
        if (role == 'paciente') {
            historial.ev_doc = rating;
            historial.com_doc = comentario;
            try {
                await historial.save();             
            return response.status(201).json({
                message: 'Dr evaluado  exitosamente'
            });
              } catch (error) {
                  return response.status(500).json({
                    message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
                    error
                  });
              }         
        }       
    }

    async getHistorial ({ response , auth }) {
        const user = await auth.getUser();
        const role= user.role;
        if (role == 'medico') {
            // Cargar al médico cuyo user_id coincide con user.id
            const doctor_data = await Doctor.findBy('user_id', user.id);
            const idDoctor = doctor_data.id_doctor;
            try {
                const data = await Asesoria.query().select('pacientes.id_pacientes','nombre', 'apellido', 'fecha', 'id_asesoria','ev_pac','com_pac','diagnostico')
            .innerJoin('pacientes','asesorias.id_paciente', 'pacientes.id_pacientes').where({id_doctor:idDoctor, estado:'pasada'})
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
            const paciente_data =  await Paciente.findBy('user_id', user.id);
            const idPaciente = paciente_data.id_paciente;
            try {
                const data = await Asesoria.query().select('doctors.id_doctor','nombre', 'apellido', 'fecha', 'id_asesoria','ev_doc','com_doc','diagnostico')
                    .innerJoin('doctors','asesorias.id_doctor', 'doctors.id_doctor').where({id_paciente: idPaciente, estado:'pasada'})
                    .innerJoin('users','doctors.user_id', 'users.id').fetch();
            
                return response.status(201).json({data});
            } catch (error) {
                  return response.status(500).json({
                    message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
                    error
                  });
                }
        }
    }

    async getComentarios ({ params,response , auth }) {
        const user = await auth.getUser();
        const role= user.role;
        if (role == 'medico') {
            try {
                const data = await Asesoria.query().select('com_pac','ev_pac')
            .where({id_paciente: params.id, estado:'pasada'})
            .fetch();
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
            
            try {
                const data = await Asesoria.query().select('com_doc','ev_doc')
            .where({id_doctor: params.id, estado:'pasada'})
            .fetch();
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

    async getAgendados ({ params, response }) {
        try {
            const data = await Asesoria.query().select( 'fecha')
            .where({id_doctor:params.id, estado:'futura'}).fetch();
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
    async diagnosticar ({ request, response , auth }) {
        const user = await auth.getUser();
        const role= user.role;
        const { id_asesoria,diagnostico } = request.all();
        const historial = await Asesoria.findBy('id_asesoria', id_asesoria);
        historial.estado="evaluación";
        if (role == 'medico') {
            historial.diagnostico = diagnostico;
            try {
                await historial.save();             
            return response.status(201).json({
                message: 'Paciente diagnosticado exitosamente'
            });
              } catch (error) {
                  return response.status(500).json({
                    message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
                    error
                  });
              }
            
        }
             
    }
    async getEstado ({ response , auth }) {
        const user = await auth.getUser();
        const role= user.role;
        if (role == 'medico') {
            const doctor_data = await Doctor.findBy('user_id', user.id);
            const idDoctor = doctor_data.id_doctor;
            try {
                const asesoria= await Asesoria.query().select()
            .where({id_doctor: idDoctor, estado:'pasada'})
            .orWhere({id_doctor: idDoctor, estado:'futura'})
            .first();
             const idAsesoria= asesoria.id_asesoria;  
             const estadoAsesoria= asesoria.estado;
             const idPaciente= asesoria.id_paciente;
             //buscar id usuario del paciente
             const paciente = await Paciente.findBy('id_paciente', idPaciente);
             const user = await User.findBy('id', paciente.user_id);
             const userID= user.uid;
             const nombre= user.nombre;
             const apellido= user.apellido;

             if(estadoAsesoria=='en curso'){
                const socket = await SocketConnection.findBy('user_id', userID);
                const socketID=socket.socket_id;
                return response.status(201).json({
                    socketID,
                    idAsesoria,
                    nombre,
                    apellido
                    
                });
                 
             }else{
                return response.status(201).json({
                    idAsesoria,
                    nombre,
                    apellido
                    
                });
             }          
            
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
