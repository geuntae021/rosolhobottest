const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: "내돈",
    aliases: ["지갑"],
    description: "bleh",

    async run (client, message, args) {

        let user = message.mentions.users.first() || message.author;

        let bal = await db.fetch(`money_${message.guild.id}_${user.id}`);
        if(bal === null) bal = 0;

        message.channel.send(`${user} 님은 현재 ${bal}개의 로벅스가 있습니다.`)
    }
}