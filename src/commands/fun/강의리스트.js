const Discord = require('discord.js');

module.exports = {
    name: "youtube",
    aliases: ["ㅛ", "강의리스트", "y"],
    description: "The help command, what do you expect?",

    async run (client, message, args){

        //Sort your commands into categories, and make seperate embeds for each category

        const moderation = new Discord.MessageEmbed()
        .setTitle('강의리스트')
        .setURL('https://youtu.be/pe-xR_E6v1k')
        .addField('1. [디스코드] 디스코드 봇 만들기 1화 봇 기본세팅[https://youtu.be/6289SVNX2Qo]')
        .setTimestamp()
    }
}

