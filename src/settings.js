const { Client } = require('discord.js');
const client = new Client();
const config = require('./discord.json')

client.on('ready', () => {
    console.log('점검용입니다. (잘못 켰으면은 꺼주세요)')
    client.user.setActivity('봇이 현재 점검중입니다.')
})

client.login(config.qa_token)