const { Message } = require('discord.js')

module.exports = {
    name : '역할제거',
    run : async(client, message, args) => {
        //lets use parameters (optional)
        /**
         * @param {Message} message
         */
        //so firstly we will check whether the author of the message has permissions
        //this line means if the author doesn't have manage roles permission it will stop the process and send the following text
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('**Your** No **Permissons**!')
        //next we define some variables
        const target = message.mentions.members.first() //member = mentions
        if(!target) return message.channel.send('맨션이 된 사람이 없습니다.') //when no member is pinged
        const role = message.mentions.roles.first() // roles = mentions
        if(!role) return message.channel.send('역할 맨션이 없습니다..') //when no role is specified or pinged
        //now the code!
        await target.roles.remove(role) // removeing the role to the user
        message.channel.send(`${target.user.username}님한테 **${role}**라는 역할을 삭제 했어요!`) //this is optional and editable
    }
}