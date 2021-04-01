const db = require('quick.db');

module.exports = {
    name: "경고확인",
    description: "Check a users warnings",

    async run (client, message, args){
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;


        let warnings = await db.get(`warnings_${message.guild.id}_${user.id}`);

        if(warnings === null) warnings = 0;

        message.channel.send(`**${user.username}**님 한테는 **${warnings}** 개의 경고가 있습니다.`);
    }
}