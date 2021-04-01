module.exports = {
    name: "dm",
    aliases: ["디엠", "dm전송", "전송DM", "DM"],
    description: "DM a user in the guild",
    category: "fun",
    run: async (bot, message, args) => {
      if (!message.member.permissions.has("MANAGE_MESSAGES"))
        return message.channel.send("이 명령어를 사용하려면, 메시지 관리 권한이 필요합니다.");
      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (!user)
        return message.channel.send(
          `사용자를 맨션하지 않았거나 잘못된 ID를 제공했습니다.`
        );
      if (!args.slice(1).join(" "))
        return message.channel.send("메시지를 지정하지 않았습니다.");
      user.user
        .send(args.slice(1).join(" "))
        .catch(() => message.channel.send("그 사용자는 DM 보낼수 없습니다!"))
        .then(() => message.channel.send(`메시지를 보냈습니다. ${user.user.tag}`));
    },
  };