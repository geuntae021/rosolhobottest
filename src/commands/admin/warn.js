const Discord = require('discord.js');

const db = require('quick.db');

module.exports = {
    name: "경고",
    description: "Warn a member",

    async run (client, message, args) { // .경고 라고 칠경우 아래에 있는것을 실행
        if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send('너는 권한이 없어.');

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send('멘션 또는 ID를 통해 사용자을 지정하세요!');

        if(user.bot) return message.channel.send('봇한테는 경고를 줄수없습니다.');

        if(message.author.id === user.id) return message.channel.send('자신을 경고 할수 없습니다.');

        if(message.guild.owner.id === user.id) return message.channel.send('대표한테 경고 할수 없습니다.');

        let reason = args.slice(1).join(" ");

        if(!reason) reason = '사유 없음';

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

        if(warnings === 4) return message.channel.send(`${user} 님이 4차 경고 부여로 밴처리됩니다.`)


        if(warnings === null) { // 경고를 set 함
            db.set(`warnings_${message.guild.id}_${user.id}`, 1);
            user.send(`You were warned in ${message.guild.name} 다음과 같은 이유로: \`${reason}\``)
            await message.channel.send(`**${user.username}** 경고를 받았습니다.`)
        }

        if(warnings !== null){ // 경고를 add(추가)함
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            user.send(`You were warned in ${message.guild.name} 다음과 같은 이유로: \`${reason}\``)
            await message.channel.send(`**${user.username}** 경고를 받았습니다.`)
        }
    }
}