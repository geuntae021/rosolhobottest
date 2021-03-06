const { MessageEmbed, DiscordAPIError, Discord, bot } = require("discord.js")
const global = require('../../lib/sub/global.json')

module.exports = {
    name: "봇정보",
    description: "봇의 정보를 출력합니다",
    run: async (bot, message, args) => {
        let inline = true
        let bicon = bot.user.displayAvatarURL()
        let usersize = bot.users.cache.size
        let chansize = bot.channels.cache.size
        let uptime = bot.uptime 
        let servsize = bot.guilds.cache.size
        let ME  = new MessageEmbed()
        .setColor("#0099ff")
        .setThumbnail(bicon)
        .addField("봇 이름", `${bot.user.username}`, inline)
        .addField("봇 주인", "로쏠호#7854", inline )
        .addField("서버 개수", `🛡 ${servsize}`, inline)
        .addField("채널 수", `📁 ${chansize}`, inline)
        .addField('RAM usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline )
        .addField("유저 수", `${usersize}`, inline)
        .addField("봇 언어", "Discord.js", inline)
        .addField("봇 이름", `${global.bot_name}`, inline )
        .addField("생일", bot.user.createdAt)
        .addField("노드 버전", `${process.version}`, inline )
        .addField("이 서버 가입일", message.guild.joinedAt)
        .setTimestamp()
        message.channel.send(ME);
    
    }
}