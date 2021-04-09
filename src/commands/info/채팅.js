const reconlx = require('reconlx') 

module.exports = {
    name : '채팅',
    run : async(client, message, args) => {
        reconlx.chatBot(message, args.join(" "))
    }
}