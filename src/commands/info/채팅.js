const { chatBot } = require('reconlx') 

module.exports = {
    name : '채팅',
    run : async(client, message, args) => {
        chatBot(message, args.join(" "))
    }
}