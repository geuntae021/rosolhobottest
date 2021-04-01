const Discord = require('discord.js');
const client = new Discord.Client();
const TextChannel = Discord.TextChannel

module.exports = {
    name: "공지",

    run: async (client, message, args) => {

        message.channel.send('공지 전송중...').then(e =>{
            const embed = new Discord.MessageEmbed()
              .setTitle('📢 로블이 공지사항')
              .setColor('BLUE')
              .setFooter(`공지는 ✅ㅣ봇공지, 🔔봇공지, 봇공지, 🔔│봇 공지, 🔔봇 공지, 봇 공지, 📢│봇공지, 📢봇공지, 봇공지 채널에 전송되요 \n ${message.author.tag} - 인증됨.`)
              .setDescription(message.content.slice(message.content.replace('\n', ' ').split(' ')[0].length, message.content.length))
        
        client.guilds.forEach(guild => {
            for(let i in config.channel){
                const gchannel = guild.channels.find(
                    val => (
                        val.name.includes(config.channel[i])) && val instanceof TextChannel
                    )

        if(gchannel instanceof TextChannel) {
            gchannel.send(embed)
        } else return
    }
})
            e.edit(':white_check_mark: 공지가 정상적으로 보내졌습니다!')
        })
    }
};