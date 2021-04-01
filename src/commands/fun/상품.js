
const Discord = require('discord.js');

module.exports = {
    name: "상품",
    description: "View the store",

    async run (client, message, args) {

        const embed = new Discord.MessageEmbed()
        .setTitle('Store')
        .setDescription(`자동차 500코인\n닌텐도 600코인\n아이패드 100000코인\n비행기 150000코인\n철검 1500000코인\n아이폰 600000코인`)
        .setTimestamp();

        message.channel.send(embed);
    }
}