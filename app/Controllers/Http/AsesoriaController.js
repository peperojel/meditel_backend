'use strict'
const Doctor = use('App/Models/Doctor');
const Database = use('Database');
const User = use('App/Models/User');
const Paciente =use('App/Models/Paciente');
const Asesoria =use('App/Models/Asesoria');
const SocketConnection = use('App/Models/SocketConnection')

const Event = use('Event')

class AsesoriaController {

    async create ({ request, response , auth }) {
    // Cargar al paciente cuyo user_id coincide con user.id
        const paciente_data = await Database
        .table('pacientes')
        .where('user_id', auth.user.id)
        .first();
        
        const idPaciente = paciente_data.id_paciente;
        const { id_doctor, fecha, motivo} = request.all();

        const asesoria = new Asesoria();
        asesoria.id_doctor = id_doctor;
        asesoria.id_paciente = idPaciente;
        asesoria.fecha = fecha;
        asesoria.motivo = motivo;


    
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
        const docInstance = await auth.user.doctors().fetch();
        const { id_asesoria, diagnostico } = request.all();
        const asesoriaBruto = await docInstance.asesorias()
            .where('id_asesoria', id_asesoria)
            .fetch();
        const asesoriaInstance = asesoriaBruto.rows[0];
        asesoriaInstance.estado="evaluación";
        asesoriaInstance.diagnostico = diagnostico;
        try {
            await asesoriaInstance.save();             
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

    async evaluar ({ request, response , auth }) {
        const user = await auth.getUser();
        const role= user.role;
        const { id_asesoria,rating,comentario } = request.all();
        const historial = await Asesoria.findBy('id_asesoria', id_asesoria);

        if (role == 'medico') {
            historial.ev_pac = rating;
            historial.com_pac = comentario;
            historial.estado="pasada";
            try {
                await historial.save();             
            return response.status(201).json({
                message: 'Paciente evaluado y diagnosticado exitosamente'});
            } catch (error) {
                  return response.status(500).json({
                    message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
                    error});
            }
        }

        if (role == 'paciente') {
            historial.ev_doc = rating;
            historial.com_doc = comentario;
            try {
                await historial.save();             
                return response.status(201).json({
                    message: 'Dr evaluado  exitosamente'});
            } catch (error) {
                  return response.status(500).json({
                    message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
                    error});
            }         
        }    
    }

    async getEstado ({ response , auth }) {
        if (auth.user.role == 'medico') {
            const doctor_data = await auth.user.doctors().fetch();
            const idDoctor = doctor_data.id_doctor;
            const respuesta = {};
            try {
                const asesoria= await Asesoria.query().select()
                    .whereIn('estado', ['en curso', 'diagnóstico', 'evaluación'])
                    .andWhere('id_doctor', idDoctor)
                    .first();
                if ( asesoria === null ) {
                    return response.status(201).json(respuesta);
                }
                respuesta.id_asesoria = asesoria.id_asesoria;
                respuesta.estado = asesoria.estado;
                //buscar id usuario del paciente
                const paciente = await asesoria.paciente().fetch()                
                const userPaciente = await paciente.user().fetch();                                
                respuesta.nombre = userPaciente.nombre;
                respuesta.apellido = userPaciente.apellido;
                if ( asesoria.estado === 'en curso' ) {
                    // const socket = await SocketConnection.findBy('user_id', userPaciente_id);
                    const socket = await SocketConnection.query().select('id_socket')
                        .where( {id_user: userPaciente.uid, topic: 'asesoria:'+idDoctor})
                        .first();
                    respuesta.to_socket = socket.id_socket;
                    return response.status(201).json(respuesta);
                } else {
                    return response.status(201).json(respuesta);
                }
            } catch (error) {
                  return response.status(500).json({
                    message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
                    error
                  });
            }                  
        }    
    }

    // Función provisoria que gatilla eventos de inicio de asesoria
    async asesoriaStart( {request, response} ) {
        const { id_asesoria } = request.all();
        // console.log(id_asesoria)
        Event.fire('asesoria::notify', [id_asesoria]);
        
    }

}

module.exports = AsesoriaController
