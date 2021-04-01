module.exports = {
    name: "언뮤트",
    description: "Unmute a member from your server",
    usage: ";ㅕㅡ  <사용자>",
    aliases: ["언뮤", "해방", '죄', '넌 죄가 없다', 'ㅕㅡ', '너의죄를사하노라', "um", 'unmute'],

    async run (client, message, args) {
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("너는 권한이 없어.");

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send("사용자를 입력하지 않았습니다.\n사용법 : " + module.exports.usage);

        let role = message.guild.roles.cache.find(x => x.name === "Muted");

        if(!user.roles.cache.some(r => r.name === "Muted")) {
            return message.channel.send(`${user}님은 뮤트를 먹지 않았어요.`);
        }

        if(user.roles.cache.has(role)) return message.channel.send(`${user}님을 해방시키지 못 했어요.\n오류 코드: \`\`NO_BOT_PERMISSION\`\``);

        user.roles.remove(role);

        message.channel.send(`${user}님 해방 되었어요!`)
    }
}