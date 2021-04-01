module.exports = {
    name: 'stop',
    aliases: ["나가"],
    
run: async (client, message, args) => {
    const { channel } = message.member.voice;
    if (!channel){ message.channel.send("이 명령을 사용하기 전에 음성 채널에 가입하십시오!")}
    if (message.guild.me.voice.channel !== message.member.voice.channel) {
        return message.channel.send("봇하고 똑같은 음성채널에 있어야 합니다.");
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
    return message.channel.send({embed: { // 이런 임베드를 전송
      description:'↪ 바이루'}})
  } catch {
      serverQueue.connection.dispatcher.end();
      await channel.leave();
      return message.channel.send("오류가 나서 다시시도"); // 오류가 날 경우 다시시도
  }
}
};