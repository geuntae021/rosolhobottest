const { MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "경품",
  aliases: ["이벤트시작", "이벤트 시작", "ㅇㅂㅌㅅㅈ", "ㅇㅂㅌ ㅅㅈ"],
  description: "Create a simple giveaway",
  usage: "<time> <channel> <prize>",
  category: "fun",
  run: async (bot, message, args) => {
    if (!args[0]) return message.channel.send(`시간을 지정하지 않았습니다!`);
    if (
      !args[0].endsWith("d") &&
      !args[0].endsWith("h") &&
      !args[0].endsWith("m")
    )
      return message.channel.send(
        `당분간 올바른 형식을 사용하지 않았습니다!`
      );
    if (isNaN(args[0][0])) return message.channel.send(`그것은 숫자가 아닙니다!`);
    let channel = message.mentions.channels.first();
    if (!channel)
      return message.channel.send(
        `길드(서버)에서 그 채널을 찾을 수 없습니다!`
      );
    let prize = args.slice(2).join(" ");
    if (!prize) return message.channel.send(`상품이 지정되지 않았습니다!`);
    message.channel.send(`*Giveaway created in ${channel}*`);
    let Embed = new MessageEmbed()
      .setTitle(`상품!`)
      .setDescription(
        `상품:**${prize}**`
      )
      .setTimestamp(Date.now() + ms(args[0]))
      .setColor(`BLUE`);
    let m = await channel.send(Embed);
    m.react("🎉");
    setTimeout(() => {
      if (m.reactions.cache.get("🎉").count <= 1) {
        message.channel.send(`반응: ${m.reactions.cache.get("🎉").count}`);
        return message.channel.send(
          `당첨자 추첨을 시작하기에 충분한 사람들이 반응하지 않았습니다!`
        );
      }

      let winner = m.reactions.cache
        .get("🎉")
        .users.cache.filter((u) => !u.bot)
        .random();
      channel.send(
        `** ${prize} ** 경품 당첨자는 ... ${winner}`
      );
    }, ms(args[0]));
  },
};