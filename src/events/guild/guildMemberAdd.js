const { BitField, MessageEmbed } = require("discord.js")
const moment = require('moment-timezone');

const blackList = require('../../blacklist/blackList.json')
const welcomeChannelId = 813964554844897320 // 입장 시 환영메시지를 전송 할 채널의 이름을 입력하세요.

module.exports = async (bot, member) => {
    // 가입한지 30분이 지나지 않았고,
    // 아바타 이미지가 없으면 밴.
    let condition1 = moment.duration(moment(new Date()).locale('ko').diff(moment(member.user.createdTimestamp).locale('ko'))).asMinutes() < 30;
    let condition2 = member.user.defaultAvatarURL == member.user.displayAvatarURL();
    let condition3 = member.user.username.indexOf('섬광탄') != -1; // 섬광탄이라는 단어가 프로필이름 들어갈 경우 유저를 밴
    let condition4 = member.user.username.indexOf('로쏠호') != -1; // 로쏠호라는 단어가 프로필이름 들어갈 경우 유저를 밴
    if (condition1) member.ban();
    if (condition1 && condition2) member.ban();

    if (condition3 && condition4) member.ban();


    const guild = member.guild
    const newUser = member.user
    // const welcomeChannel = guild.channels.cache.find((channel) => channel.name == welcomeChannelName)
    const welcomeChannel = guild.channels.cache.find((channel) => channel.id == welcomeChannelId)

    const welcome = new MessageEmbed()
    .setTitle('멤버 입장')
    .setDescription(`<@!${newUser.id}> 님이 ${member.guild.name} 에 들어오셨습니다.`)
    .setTimestamp()
    welcomeChannelId.send(welcome)


    // let banAlertChannel;
    // if(process.env.NODE_ENV == 'live') {
    //     banAlertChannel = bot.guilds.cache.find(x => x.name == '팀 서버').channels.cache.find(x => x.name == '경고');
    // }
    // else if(process.env.NODE_ENV == 'qa') {
    //     banAlertChannel = bot.guilds.cache.find(x => x.name == '__youtube_test').channels.cache.find(x => x.name == '일반');
    // }
    // else {
    //     console.log('guildMemberAdd 버그났당..?');
    //     return;
    // }

    for (bl of blackList) {
        blackList.userid; // 블랙리스트에 있는 ID 유저인지 체크
        let kick_msg = member.user.username + '#' + member.user.discriminator + '이(가) 강퇴시켰습니다.';

        let user = member.guild.members.cache.find(x => x.id == bl)
        if (user) {
            // console.log(user.user)
            // banAlertChannel
            //           .send(`<@${user.id}> ${user.user.username}#${user.user.discriminator}는 블랙리스트에 있는 새끼라서 밴당했습니다.`);
            user.ban(kick_msg)
            // break;
        }
    }
}