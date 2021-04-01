
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "야동",
  aliases: ["ㅇㄷ"],
  category: "info",
  description: "Get the youngest account creation date in the guild!",
  run: async (bot, message, args) => {

        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle('야동 보려면 클릭')
            .setURL('https://youtu.be/_A4VQ-I7alA')
            .setTimestamp();

            


        
    
            
            
    
            
            
            message.channel.send(embed)
        }
    }
