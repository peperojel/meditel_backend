'use strict'

const Event = use('Event');

Event.on('new::asesoria', 'AsesoriaListener.create');
Event.on('finished::asesoria', 'AsesoriaListener.finished');
