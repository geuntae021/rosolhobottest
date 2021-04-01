const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "ban",
    aliases: ["차단", "밴", "qos", "ckeks", "ㅠ무"],
    usage: "[id, | mention]",
    category: "moderation",
    run: async (client, message, args) => { // ban 또는 차단 밴 qos ckeks ㅠ무 라고 칠경우 아래에 있는것을 실행
        if (message.deletable) message.delete();

        if (!args[0]) return message.reply('차단할 멤버를 멘션 또는 ID로 적어주세요.');

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("❌ 차단 권한이 필요해요...");
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`❌ ${client.user.username}에게 차단 권한이 필요해요...`);

        const toKick = message.guild.members.cache.get(args[0]) || message.mentions.members.first();

        if (!toKick) return message.channel.send('멤버를 찾을 수 없습니다...');

        if (message.author.id === toKick.id) return message.channel.send('자기 자신을 차단할 수 없습니다...');
        if (client.user.id === toKick.id) return message.channel.send(`${client.user.username}으로 ${client.user.username}을 차단하려고요...?`);

        if (!toKick.bannable) return message.channel.send('역할이 높아서 차단을 못 하겠네요...');

        const embed = new MessageEmbed().setColor(0xffff00)
            .setThumbnail(toKick.user.displayAvatarURL())
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setTimestamp()
            .setTitle('멤버 차단')
            .setDescription(stripIndents`**차단된 멤버**\n${toKick}\n\n**차단한 사람**\n${message.author}\n\n**이유**\n${args.slice(1).join(" ") ? args.slice(1).join(" ") : "없음"}`);

            let reason = args.slice(1).join(" ");

            if(!reason) reason = '사유 없음';

            toKick.send(`안녕! 넌 \`\`${message.guild.name}\`\` 에서 강퇴당했어!\n이유 -> \`\`${reason}\`\``)

        const promtEmbed = new MessageEmbed().setColor(0x00ff00).setDescription(`**${toKick}**님을 차단하실 건가요?`);

        let filter = (reaction, user) => (reaction.emoji.name === '✅' || reaction.emoji.name === '❎') && user.id === message.author.id;

        message.channel.send(promtEmbed).then(async (msg) => { // 메시지 반응 추가
            await msg.react('✅');
            await msg.react('❎');

            msg.awaitReactions(filter, {
                max: 1
            }).then((collected) => {
                if (collected.array()[0].emoji.name === '✅') { // 오류가 날 경우 아래에 있는것을 실행
                    msg.delete();

                    toKick.ban({reason: args.slice(1).join(" ") || null}).catch(err => message.channel.send(`Error...\n${err}`));
    
                    message.channel.send(embed);
                } else { // 만약에 ❎ 를 누를경우 아래에 있는것을 실행
                    msg.delete();

                    message.channel.send('차단이 취소 되었습니다!');
                };
            });
        });
    }
};