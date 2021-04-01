const Discord = require('discord.js')
const client = new Discord.Client();
const db = require('quick.db')

module.exports = {
    name: '블랙삭제',
    description: 'Whitelists a user',
    aliases: ["블삭", "블제"],
    usage: 'whitelist <user>',
    category: 'Developer',
    required: 'DEVELOPER',
    guildOnly: true,
    run: async (client, message, args) => {
        if (message.author.id === '813634627800530984') {
            let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0])
            
            let noUser = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL({
                    dynamic: true
                }))
                .setColor('RED')
                .setDescription('유저를 입력하세요')
                .addField("사용법:", '`. 블랙삭제 <유저 아이디 또는 유저맨션>`')
                .setFooter(message.client.user.username, message.client.user.avatarURL())

            if (!User) return message.channel.send(noUser)

            let checkingBlacklisted = db.fetch(`blacklisted_${User.id}`)

            if(!checkingBlacklisted === true){
                let alreadyBlacklisted = new Discord.MessageEmbed()
                .setDescription('그 유저는 블랙이 아닙니다')
                .setAuthor(message.author.username, message.author.avatarURL({
                    dynamic: true
                }))
                .setColor('RED')
                .setFooter(message.client.user.username, message.client.user.avatarURL())

            return message.channel.send(alreadyBlacklisted)
            }

            db.delete(`blacklisted_${User.id}`)
            let blacklistedEmbed = new Discord.MessageEmbed()
                .setDescription('블랙삭제 된 사람: **' + User + '**')
                .setAuthor(message.author.username, message.author.avatarURL({
                    dynamic: true
                }))
                .setColor('BLUE')
                .setFooter(message.client.user.username, message.client.user.avatarURL())
            message.channel.send(blacklistedEmbed)
            
            
        } else {
            let cannotUse = new Discord.MessageEmbed()
                .setDescription('권한이 없습니다')
                .setAuthor(message.author.username, message.author.avatarURL({
                    dynamic: true
                }))
                .setColor('RED')
                .setFooter(message.client.user.username, message.client.user.avatarURL())
            message.channel.send(cannotUse)
        }
    }
}

