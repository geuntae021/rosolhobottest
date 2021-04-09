const { MessageFlags } = require("discord.js");

module.exports = {
    name: "봇초대코드생성",
    desciption: "say command",

    async run (client, message, args) {
        let msg; // msg 라는 값을 만든다
        let textChannel = message.mentions.channels.first()

        if(textChannel) {
            msg = args.slice(1).join(" ");
            textChannel.send(`https://discord.com/api/oauth2/authorize?client_id=${msg}&permissions=8&scope=bot`) // msg 라는 값을 유저가 직접 쓰는것으로 만든다
        } else {
            msg = args.join(" ");
            message.channel.send(`https://discord.com/api/oauth2/authorize?client_id=${msg}&permissions=8&scope=bot`)
        }
    }
}