const db = require('quick.db');
const warnings = require('./warnings');

module.exports = {
    name: "경고삭제",
    description: "Delete a member's warns",


    async run (client, message, args){
        if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send('권한이 없는데요');

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send('맨션또는 유저아이디를 적어주세요');

        if(user.bot) return message.channel.send('봇에게는 경고를 지울수없습니다.');

        if(user.id === message.author.id) return message.channel.send('자신의 경고를 지울 수 없습니다.');

        if(warnings === null) return message.channel.send(`**${user.username} 경고가 없습니다.**`);


        db.delete(`warnings_${message.guild.id}_${user.id}`);

        message.channel.send(`**${warnings}** 경고를 삭제했습니다.`)
    }
}