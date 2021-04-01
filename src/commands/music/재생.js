const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");

module.exports = {
  name: "play",
  aliases: ["재생", "플레이"],
  run: async function(client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel) {
      message.channel.send("우선, 음성채널에 접속해 주세요!");
    }

    if (!message.guild.me.hasPermission("CONNECT")) { // 접속 권한이 없을경우 아래에 있는 메시지를 띄움
      message.channel.send({
        embed: {
          color: "FF0000",
          description:
            "봇이 음성채널에 접속할 권한이 없습니다"
        }
      });
    }
    if (!message.guild.me.hasPermission("SPEAK")) { // 말할 권한이 없을경우 아래에 있는 메시지를 띄움
      message.channel.send({
        embed: {
          color: "FF0000",
          description:
            "봇이 음성채널에서 말할 권한이 없습니다"
        }
      });
    }
    var searchString = args.join(" ");
    if (!searchString) {
      message.channel.send("음악 제목이나 링크를 입력해 주세요");
    }

    var serverQueue = message.client.queue.get(message.guild.id);

    var searched = await yts.search(searchString);
    if (searched.videos.length === 0) {
      message.channel.send("음악을 찾을수 없습니다");
    }
    var songInfo = searched.videos[0];

    const song = {
      id: songInfo.videoId,
      title: Util.escapeMarkdown(songInfo.title),
      views: String(songInfo.views).padStart(10, " "),
      url: songInfo.url,
      ago: songInfo.ago,
      duration: songInfo.duration.toString(),
      img: songInfo.image,
      req: message.author
    };

    if (serverQueue) {
      serverQueue.songs.push(song);
      let thing = new MessageEmbed()
        .setTitle("곡이 재생목록에 추가되었습니다")
        .setImage(song.img)
        .setColor("ORANGE")
        .setDescription(
          `**곡 이름:**   
[${song.title}](${song.url})     

**곡 시간**
${song.duration}

**곡을 추가한 사람:**
[${message.author}]


        
        
        `
        )
      return message.channel.send(thing);
    }

    const queueConstruct = { // 기본설정
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 3.5,
      playing: true
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async song => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
         message.client.queue.delete(message.guild.id);
        return;
      }

      const dispatcher = queue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
          queue.songs.shift();
          play(queue.songs[0]);
        })
        .on("error", error => console.error(error));
      dispatcher.setVolumeLogarithmic(queue.volume / 5);
      let thing = new MessageEmbed()
        .setTitle("곡을 재생합니다")
        .setDescription(
          `
**곡 이름**   
[${song.title}](${song.url})     

**곡 시간**
${song.duration}

**곡을 추가한 사람**
[${message.author}]
`
        )

        .setImage(song.img)
        .setColor("GREEN")
      queue.textChannel.send(thing);
    };

    try {
      const connection = await channel.join();
      queueConstruct.connection = connection;
      channel.guild.voice.setSelfDeaf(true);
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      message.client.queue.delete(message.guild.id);
      //await channel.leave();
      return console.log( // 오류가 날 경우 아랴에 있는것을 띄움
        `I could not join the voice channel: ${error}`,
        message.channel
      );
    }
  }
};
