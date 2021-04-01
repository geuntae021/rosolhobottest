module.exports = {
    name: "stop",
    aliases: ["정지", "ㅈㅈ", "스탑"],
    run: async function(client, message, args) {
    const { channel } = message.member.voice;
    if (!channel){ message.channel.send("이 명령을 사용하기 전에 음성 채널에 가입하십시오!")} // 음성채널에 없을경우 리턴
    if (message.guild.me.voice.channel !== message.member.voice.channel) { // 봇하고 똑같은 음성채널에 없을경우 아래문구 실행
        return message.channel.send("봇하고 똑같은 채널에 있어야합니다!");
      }
    const serverQueue = client.queue.get(message.guild.id);
  try {
    if (serverQueue) {
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end()
    message.guild.me.voice.channel.leave();
    } else {
    channel.leave();
    }
    return message.channel.send({embed: { // 음악 정지에 성공할 경우 아래에 있는 임베드 전송
      description:'↪ 음악을 정지합니다.'}})
  } catch {
      serverQueue.connection.dispatcher.end();
      await channel.leave();
      return message.channel.send("다시 시도");
  }
}
};