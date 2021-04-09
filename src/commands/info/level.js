const leveling = require('discord-leveling');

module.exports = {
    name: "level",
    description: "레벨을 확인합니다.",
    aliases: ["레벨"],
    run: async (client, message, args) => {
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author

        let outpnt = await leveling.Fetch(user.id)
        message.channel.send(`${user} 님은 현재 ${outpnt.xp} 경험치로 ${outpnt.level} 레벨 입니다.`);
    }
}