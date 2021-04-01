module.exports = {
    name: "skip",
    aliases: ["스킵", "넘기기", "tmzlq", "sjarlrl"],
    run: async function(client, message, args) {
    const { channel } = message.member.voice;
    if (!channel) return message.channel.send("이 명령을 사용하기 전에 음성 채널에 가입하십시오!");
    if (message.guild.me.voice.channel !== message.member.voice.channel) {
        return message.channel.send("저를 이용하시려면 제 음성 채널에 가입하세요!");
      }
    const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("❌ **이 서버에서 재생되지 않음**");
  try {
    serverQueue.connection.dispatcher.end();
    return message.channel.send({
      embed:{
      color: "BLUE",
      Title: "음악이 스킵됨",
      description:"⏩ 음악이 스킵되었습니다"
      }})
  } catch {
      serverQueue.connection.dispatcher.end();
      await channel.leave();
      return message.channel.send("TRY AGAIN TO SKIP")
  }
}
};