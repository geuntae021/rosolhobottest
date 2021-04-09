const { MessageEmbed } = require('discord.js')
module.exports = {
  name: "hellothisisverification",
  category: "info",
  description: "봇 개발",
  run: async (client, message, args) => {         
            const embed = new MessageEmbed()
            .setTitle('한디리 전용 명령어')
            .addField('주인은?', '로쏠호#7854')
            .addField('팀원들', '로쏠호#7854 (더 없음)')
            .setFooter('로블이 BOT ❤️')
            message.channel.send(embed)
        }
    }
