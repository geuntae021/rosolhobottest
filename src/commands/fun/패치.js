const { MessageEmbed } = require('discord.js')
module.exports = {
    name : '패치',
    description : 'Returns latency and API ping',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
      
const embed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle(`패치내용: 역할멘션, 유저멘션 감지가 추가되었습니다.`)

            
            

            


        
    
            
            
    
            
            
            message.channel.send(embed);
        }
    }
    