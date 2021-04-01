const { MessageEmbed } = require("discord.js")
const moment = require("moment")

module.exports = {
  name: "아바타",
  aliases: ["whois", "user"],
  usage: "userinfo <MENTION>",
  description: "Get advance stats of given person or yourself",
  run: async (client, message, args) => {



    //OPTIONS FOR STATUS
const embed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle(`${message.author.username}님의 프사`)
            .setImage(`${message.author.displayAvatarURL({ dynamic: true })}`)

            
            

            


        
    
            
            
    
            
            
            message.channel.send(embed);
        }
    }
    