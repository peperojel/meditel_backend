'use strict'

const moment = require('moment');
const ChatMessageHook = exports = module.exports = {}

ChatMessageHook.setTimestamp = async (messageInstance) => {
    messageInstance.created_at = moment().utcOffset("-03:00")
        .format()
}
