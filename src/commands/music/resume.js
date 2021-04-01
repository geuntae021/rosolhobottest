module.exports = {
    name: "resume",
    aliases: ["다시 재생", "다시재생", "ㄷㅅㅈㅅ", "ㄷㅅ ㅈㅅ"],
    run: async function(client, message, args) {
    const { channel } = message.member.voice;
    if (!channel) { message.channel.send("본 명령어를 사용하려면 음성채널에 있어야 해요") // 음성채널에 없을경우 리턴
                   }
    const serverQueue = client.queue.get(message.guild.id);
    if (message.guild.me.voice.channel !== message.member.voice.channel) { // 봇하고 똑같은 채널에 없을경우 리턴
        return message.channel.send("본 명령어를 사용하려면 저하고 똑같은 음성 채널에 있어야 합니다!");
    }
  try {
    if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        return message.channel.send({embed:{ // 다시 재생에 성공할 경우 아래에 있는 임베드를 전송
color: "BLUE",                                       description:'▶ **다시재생됨.**'}});
    }
    return message.channel.send('**다시 재생할 수 없습니다**.');
  } catch {
    serverQueue.connection.dispatcher.end();
    return message.channel.send("**다시 시도**")
  }
}
};