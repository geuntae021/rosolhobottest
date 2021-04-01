const db = require('quick.db');
const ms = require('parse-ms');
const Discord = require('discord.js');
const money = require('../../assets/img/up.json')
const down = require('../../assets/img/down.json')

module.exports = {
    name: "돈받기",
    aliases: ["후원", "돈주기"],
    description: "Receive a daily award of money",

    async run (client, message, args) {
      
   
        let amount = 10000;

        if(message.author.id == '813634627800530984') {
            
            let mention = message.mentions.users.first();

            db.add(`money_${message.guild.id}_${mention}`, amount);
            db.set(`daily_${message.guild.id}_${mention}`, Date.now());

                const embed = new Discord.MessageEmbed()
                .setTitle('로벅스가 지급됨')
                .setDescription(`${mention} 님에게 ${amount}원의 로벅스을 지급하였습니다.`)
                message.channel.send(embed);
        } else { // 다르게 다른 사람일경우 리턴
            message.channel.send(`${message.author} 님 로벅스 살 돈이 없습니다`)
        }
    }
}