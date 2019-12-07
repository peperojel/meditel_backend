'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ChatMessage extends Model {
    static boot () {
        super.boot();
        this.addHook('beforeCreate', 'ChatMessageHook.setTimestamp');
    }

    static get createdAtColumn () {
        return null;
    }

    static get updatedAtColumn () {
        return null
    }
}

module.exports = ChatMessage
