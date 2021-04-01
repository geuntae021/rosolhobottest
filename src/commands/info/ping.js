  
const { MessageEmbed } = require('discord.js')
module.exports = {
    name : '핑',
    description : 'Returns latency and API ping',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
       const embed = new MessageEmbed()
       .addField(`:ping_pong: 현재 봇의 핑:`, `${client.ws.ping}ms`)

       message.channel.send(embed)

    }
}