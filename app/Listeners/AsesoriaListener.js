'use strict'

const Ws = use('Ws')
const Event = use('Event');
const Asesoria = use('App/Models/Asesoria');
const SocketConnection = use('App/Models/SocketConnection');
const AsesoriaListener = exports = module.exports = {}

AsesoriaListener.create = async (scInstance) => {
  const room = Ws.getChannel('asesoria:*').topic(scInstance.socket.topic);
  const newAsesoria_id = Math.random().toString(18).substr(2, 8);
  const pacienteInstance = await scInstance.auth.user.pacientes().fetch();
  const doctor_sc = await SocketConnection
    .query()
    .where({
      topic: scInstance.socket.topic,
      role: 'medico'
    })
    .first()

    // Se da inicio al timer
  var timerId = setTimeout(async () => {
    Event.removeAllListeners('accept::'+newAsesoria_id);
    Event.removeAllListeners('refuse::'+newAsesoria_id);
    scInstance.socket.emitTo('message',
      { type: 'asesoria:expired',
        data: ''
      },
      [scInstance.socket.id]);
    
    if (doctor_sc.id_socket) {
      room.emitTo('message',
      { type: 'asesoria:expired',
        data: {
          id_asesoria: newAsesoria_id
        }
      },
      [scInstance.socket.id]);
    }
    return;
    }, 2000);

  Event.on('accept::'+newAsesoria_id , async (scInstance_doc, data) => {
    clearTimeout(timerId);
    const docInstance = await scInstance_doc.auth.user.doctors().fetch();
    const newAsesoria = new Asesoria();
    newAsesoria.id_asesoria = newAsesoria_id;
    newAsesoria.estado = "en curso";
    newAsesoria.id_paciente = pacienteInstance.rows[0].id_paciente;
    newAsesoria.id_doctor = docInstance.id_doctor;
    try {
      await newAsesoria.save();
      scInstance_doc.socket.emitTo('message',
      { type: 'asesoria:accept',
        data: {
          from_socket: scInstance_doc.socket.id,
          id_asesoria: newAsesoria_id
        }
      },
      [data.to_socket]);

      Event.removeAllListeners('accept::'+newAsesoria_id);
      Event.removeAllListeners('refuse::'+newAsesoria_id);

      } catch(error) {
        //Error handler
      }
    return;
  });

  Event.on('refuse::'+newAsesoria_id , async (scInstance_doc, data) => {
    clearTimeout(timerId);
    scInstance_doc.socket.emitTo('message',
      { 
        type: 'asesoria:refuse',
        data: ''
      },
      [data.to_socket]);

      Event.removeAllListeners('accept::'+newAsesoria_id);
      Event.removeAllListeners('refuse::'+newAsesoria_id);
      return;
    });

    scInstance.socket.emitTo('message',
    {
      type: 'asesoria:request',
      data: {
        nombre: scInstance.auth.user.nombre,
        apellido: scInstance.auth.user.apellido,
        id_asesoria: newAsesoria_id,
        from_socket: scInstance.socket.id
      }
    },
    [doctor_sc.id_socket]);

  return;
}

AsesoriaListener.finished = async (scInst_doc, data) => {
  try {
    const docInstance = await scInst_doc.auth.user.doctors().fetch();
    const asesoriaInstance = await docInstance.asesorias()
      .where('id_asesoria', data.id_asesoria)
      .fetch();
    asesoriaInstance.rows[0].estado = 'diagnóstico';
    await asesoriaInstance.rows[0].save();
  } catch (error) {
    //Error handler
    console.log(error);
  }

  scInst_doc.socket.emitTo('message',
          {
            type: 'asesoria:finished',
            data: ''
          },
          [data.to_socket]
        );

}