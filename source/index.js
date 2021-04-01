const Discord = require('discord.js')
const client = new Discord.Client();
const token = 'ODI0MjAzNjc2OTkzMTkxOTY3.YFr9fQ.m58Pq0NS9Ji0_rh3Jc2_8nS9lKc';

client.on('ready', () => {
    console.log('스태프 봇이 활성화됨.')
    client.user.setActivity('로블이 스태프 봇입니다.')
})

client.on('message', (message) => {
    if(message.content == ';인증') {
        let verifyrole = message.guild.roles.cache.find(x => x.name === '모든 기능 사용가능')
        message.member.roles.add(verifyrole)
        message.reply(`<a:verify:821607987411288098> 인증이 완료되었습니다. 공식 서버에서만 사용할 수 있는 기능이 활성화 되었습니다.`)
    }
})

client.login(token);