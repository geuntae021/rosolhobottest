module.exports = {
    name: "pause",
    aliases: ["일시정지", "일시 정지", "ㅇㅅㅈㅈ", "ㅇㅅ ㅈㅈ"],
    run: async (client, message, args) => {
      const serverQueue = client.queue.get(message.guild.id);
      const { channel } = message.member.voice;
      try {
        if (!channel)
          return message.channel.send(
            "죄송하지만, 음악 일시 중지를 위해서는 음성 채널에 있어야 합니다!"
          );
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
          return message.channel.send(
            "음악을 일시 중지하려면 동일한 음성 채널에 있어야 합니다."
          );
        }
        if (serverQueue && serverQueue.playing) {
          serverQueue.playing = false;
          serverQueue.connection.dispatcher.pause(true);
          return message.channel.send({
            embed: {
              color: "BLUE",
              description: "**⏸ 음악이 정지되었습니다**"
            }
          });
        }
        return message.channel.send("**재생 중인 항목이 없습니다!**");
      } catch {
        serverQueue.connection.dispatcher.end();
        await channel.leave();
      }
    }
  };