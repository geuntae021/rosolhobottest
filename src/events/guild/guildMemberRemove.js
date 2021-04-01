// const byeChannelName = "안녕히가세욜" // 퇴장 시 메시지를 전송 할 채널의 이름을 입력하세요.
const byeChannelName = 814086794076356680 // 퇴장 시 메시지를 전송 할 채널의 이름을 입력하세요.
const { MessageEmbed } = require('discord.js')

module.exports = async (bot, member) => {
    const guild = member.guild
    const deleteUser = member.user
    // const byeChannel = guild.channels.cache.find((channel) => channel.name == byeChannelName)
    const byeChannel = guild.channels.cache.find((channel) => channel.id == byeChannelName)
  
    const left = new MessageEmbed()
    .setTitle('멤버 퇴장')
    .setDescription(`<@!${deleteUser.id}> 님이 나가셨습니다.`)
    .setTimestamp()
    byeChannel.send(left)

   
    // let banAlertChannel;
    // if(process.env.NODE_ENV == 'live') {
    //     banAlertChannel = bot.guilds.cache.find(x => x.name == '팀 서버').channels.cache.find(x => x.name == '경고');
    // }
    // else if(process.env.NODE_ENV == 'qa') {
    //     banAlertChannel = bot.guilds.cache.find(x => x.name == '로쏠호_유튜브_서버').channels.cache.find(x => x.name == '일반');
    // }
    // let muterole = member.guild.roles.cache.find(r => r.name == "Muted");
    // let isMuted = member._roles.find(x => x == muterole.id);
    // if(isMuted) {
    //     member.ban('뮤트 먹고 나가서 밴')
    //     banAlertChannel.send(`${member.user}님이 ${muterole}먹은 상태에서 퇴장하여 밴먹었습니다.`);
    // }
}