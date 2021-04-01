const { MessageFlags } = require("discord.js");

module.exports = {
    name: "봇채팅",
    desciption: "say command",

    async run (client, message, args) {
        if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('악용 방지를 위해 역할 관리권한이 있어야 합니다.')

        let msg; // msg 라는 값을 만든다
        let textChannel = message.mentions.channels.first()
        message.delete() // 유저가 친 메시지를 삭제한다

        if(textChannel) {
            msg = args.slice(1).join(" ");
            textChannel.send(msg) // msg 라는 값을 유저가 직접 쓰는것으로 만든다
        } else {
            msg = args.join(" ");
            message.channel.send(msg)
        }
    }
}