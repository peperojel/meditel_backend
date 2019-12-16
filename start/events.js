'use strict'

const Event = use('Event');

Event.on('new::asesoria', 'AsesoriaListener.create');
Event.on('finished::asesoria', 'AsesoriaListener.finished');
Event.on('asesoria::notify', 'AsesoriaListener.notify');
Event.on('agendada::ready', 'AsesoriaListener.asesoriaReady');
Event.on('agendada::start', 'AsesoriaListener.agendadaStart');
