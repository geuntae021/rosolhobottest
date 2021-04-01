const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: '봇공지',
    aliases: ['봇공'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
        run: async(client, message, args) => {
       if(!message.member.hasPermission("MESSAGE_MEMBERS")) return message.channel.send('어딜 권한도 없는 쪼꼬미가 ㅋ')
       


        let mention;

        if(!args.length) return message.channel.send('> Usage: y!announce <#channel> <message> <-ping ?>');

        const channel = message.mentions.channels.first();
        if(!channel) return message.reply('Please specify a channel!');

        if(!args[1]) return message.reply('Please specify a message to announce');

        // mentions
        if(args.some((val) => val.toLowerCase() === '-ping')) {
            for (let i = 0; i < args.length; i++ ) {
                if(args[i].toLowerCase() === '-ping') args.splice(i, 1);
            }

            mention = true;
        } else mention = false;

        if(mention === true) channel.send('@everyone');

        channel.send(
            new MessageEmbed()
                .setTitle('📢봇 공지사항📢')
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(args.slice(1).join(" "))
                .setTimestamp()
                .setColor('RANDOM')
        )


    }
}
