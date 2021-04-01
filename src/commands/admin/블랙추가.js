const Discord = require('discord.js')
const client = new Discord.Client();
const db = require('quick.db')


module.exports = {
    name: '블랙추가',
    description: 'Blacklists a user',
    aliases: ["블추", "블가"],
    usage: 'blacklist <user>',
    required: 'DEVELOPER',
    category: 'Developer',
    guildOnly: true,
    run: async (client, message, args) => {
        if (message.author.id === '813634627800530984') {
            let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0])

            let noUser = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL({
                    dynamic: true
                }))
                .setColor('red')
                .setDescription('유저를 입력하세요')
                .addField("사용법:", '`.블랙추가 <유저 아이디 또는 유저맨션>`')
                .setFooter(message.client.user.username, message.client.user.avatarURL())

              if (!User) return message.channel.send(noUser)

            let checkingBlacklisted = db.fetch(`blacklisted_${User.id}`)

            if(checkingBlacklisted === true){
                let alreadyBlacklisted = new Discord.MessageEmbed()
                .setDescription('그 유저는 이미 블랙입니다.')
                .setAuthor(message.author.username, message.author.avatarURL({
                    dynamic: true
                }))
                .setColor('RED')
                .setFooter(message.client.user.username, message.client.user.avatarURL())

            return message.channel.send(alreadyBlacklisted)
            }

            db.set(`blacklisted_${User.id}`, true)
            let blacklistedEmbed = new Discord.MessageEmbed()
                .setDescription('블랙추가 된 사람: **' + User + '**')
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