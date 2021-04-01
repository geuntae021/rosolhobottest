
module.exports = {
    name: "volume",
    aliases: ["볼륨", "ㅂㄹ"],
    run: async function(client, message, args) {
    const { channel } = message.member.voice;
    if (!channel) return message.channel.send("음성채널에 접속해서 쓰세요");
    if (message.guild.me.voice.channel !== message.member.voice.channel) {
        return message.channel.send("봇하고 같은 음성채널에 있어야 합니다.");
      }
    const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue){message.channel.send("현재 재생중인 음악이 없으므로 볼륨 설정 불가능")}
    if (!args[0]) return message.channel.send(`현재 볼륨: **${serverQueue.volume}**`);
  try {
    serverQueue.volume = args[0];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
    return message.channel.send(`볼륨을 **${args[0]}** 로 설정했습니다.`);
  } catch {
      return message.channel.send("오류가 나서 다시시도");
  }
}
};