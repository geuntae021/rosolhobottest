const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: "인벤",
    description: "View your inventory",


    async run (client, message, args) {
        let items = await db.fetch(message.author.id);
        if(items === null) items = "빈털터리네"

        const Embed = new Discord.MessageEmbed()
        .addField(`${message.author.username}님의 인벤토리`, items)

        message.channel.send(Embed);
    }
}