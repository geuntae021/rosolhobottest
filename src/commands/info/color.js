const canva = require('canvacord');
const Discord = require('discord.js')

module.exports = {
    name: "컬러",
    aliases: ['색깔', '색'],
    description: "Trigegr yourself",


    async run (client, message, args) {

        let colorOfChoice = args.join(" ");

        if(!args[0]) return message.channel.send('유효한 HEX 코드를 입력하세요. (#FF0000)');

        let image = await canva.color(`#${colorOfChoice}`)

        let color = new Discord.MessageAttachment(image, "color.png")

        message.channel.send(color);
    }
}