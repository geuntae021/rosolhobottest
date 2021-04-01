
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "youtube",
  aliases: ["y", "ㅛ", "유튜브", "파이썬"],
  category: "info",
  description: "Get the youngest account creation date in the guild!",
  run: async (bot, message, args) => {

        
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle('파이썬 강의')
            .setTitle(`디스코드 봇만들기`)
            .setURL('https://youtu.be/OyJPQC-JQG8')
            .setTitle(`디스코드 봇만들기 2화 킥, 밴, 핑 나오는거\n(오류많아서 깃허브보세요 설명란에 있는거)`)
            .setURL('https://youtu.be/FqHInsOOpeI')
            .setTimestamp()

            


        
    
            
            
    
            
            
            message.channel.send(embed);
        }
    }
