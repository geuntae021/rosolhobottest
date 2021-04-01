const { Client, Collection, MessageEmbed, Intents } = require('discord.js')
const { inspect } = require('util');
const fs = require('fs')
const client = new Client({ // 인텐트가 안켜져 있을경우 오류가 남
    ws: {
        intents: (['GUILDS',
             'GUILD_BANS',
             "GUILD_EMOJIS",
             "GUILD_INTEGRATIONS",
             "GUILD_MEMBERS",
             "GUILD_MESSAGES",
             "GUILD_WEBHOOKS",
             "GUILD_VOICE_STATES",
             "GUILD_INVITES",
             "GUILD_MESSAGE_REACTIONS",
             "GUILD_MESSAGE_TYPING"
        ])
    }
})
require('./util/misc.js')



const keepAlive = require('./server.js');
const db = require('quick.db')
const moment = require("moment");
require("moment-duration-format");
const momenttz = require("moment-timezone");
const config = require('./lib/config.json')
const setprefix = require('./lib/prefix.json')
const token = config.token;
const prefix = setprefix.mainprefix
const { join } = require('path');
require('dotenv').config()
const { error } = require('console');
const { json } = require('express');
client.commands = new Collection();
client.aliases = new Collection();
client.queue = new Map()
client.categories = fs.readdirSync("./commands");
["command","event"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 


// client.on('message', (message) => {
//    console.log(`${message.member.user.username}님이 ${message.guild.name} 서버 ${message.channel} 채널에서 채팅을 쳤습니다. 메시지 내용: ${message.content}`)
// })

// client.on('ready', () => {    console.log(        `[시스템]${client.user.username}로 로그인 하였습니다.`    );
//    client.user.setStatus('online');
//    const botgame = [        `${prefix}help | ${client.guilds.cache.size}서버와 함께 운영중`,        `${prefix}help | ${client.users.cache.size}유저들과 같이 운영중`,        `${prefix}help | 버전 1.5.8v`, `${prefix}help | 대충 정렬한 명령어 탭을 볼려면 .?`   ];
//    setInterval(() => {        
//    const activity = botgame[Math.floor(Math.random() * botgame.length)];    
//    client.user.setActivity(activity);  }, 3000 ); 
//    const channel = client.channels.cache.get('823486890920640514');
//    channel.send('봇이 작동되었습니다!')
// });

client.on('message', async message =>{
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
  if(!message.guild) return;
  if(!message.member) message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if(cmd.length == 0 ) return;
  let command = client.commands.get(cmd)
  if(!command) command = client.commands.get(client.aliases.get(cmd));
  if(command) command.run(client, message, args) 
})


client.on('message', (message) => {
    if(message.content == '휴먼 해제좀') {
        let role = message.guild.roles.cache.find(x => x.name === "휴먼상태");
        message.reply('휴면 상태가 해제되었습니다.')
        message.member.roles.remove(role)
    }
})


client.on('message', message => {
    if(message.content == '빅호가 ㄴㄱ') {
        message.reply('빅호 is <@!698472765170122842>')
    }
})

client.on('message', async message => {
    let checkingBlacklistedMembers = db.fetch(`blacklisted_${message.author.id}`)
        if (checkingBlacklistedMembers === null) {
            checkingBlacklistedMembers === false
        }
    
    
        let blacklistedEmbed = new MessageEmbed()
            .setTitle("당신은 블랙리스트에 추가되어 있습니다")
            .setColor('RED')
            .setDescription(`당신은 블랙리스트에 추가되어 있습니다. \n 해제 되실때까지 아이스의 모든 기능을 이용하실수 없습니다`)
            .setFooter("블랙문의는 섬광탄 (보스)#1111")
            .setFooter(`${client.user.username}`, client.user.avatarURL())
    
        if (checkingBlacklistedMembers === true) return message.channel.send(blacklistedEmbed)
    })

client.on('message', (message) => {
    if(message.content == '욕해') {
        message.channel.send('욕이 좀 심할 수 있습니다..\n~~님이 친거니까 킥하지 마셈~~')
        message.channel.send('야이 씨발새끼 수박씨발라먹을 이개새끼야 ㅋㅋ 애미없는 새끼가 그냥 이런 명령어를 치냐 ㅋㅋ 이 미친 개씨발새끼 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ')
    }
})

// client.on('message', (message) => {
//    if (/<@&[0-9]+>/.test(message.content) === true) {
//        if(message.author.bot) return;
//        message.reply('역할멘션 감지!!')
//    }
// })

// client.on('message', (message) => {
//    if (/\<\@\![0-9]+\>/.test(message.content) === true) {
 //       if(message.author.bot) return;
//        message.reply('유저멘션 감지!!')
//    }
// })

client.on('message', (message) => {
    if(message.content.startsWith == `${prefix}엄청난돈`) {
        const amount = 1000000;
        const member = message.author
        let staff = message.guild.roles.cache.find(x => x.name === '모든 기능 사용가능')
        db.add(`money_${message.guild.id}_${member}`, amount);
        db.set(`daily_${message.guild.id}_${member}`, Date.now());
        message.reply(':verify: 돈이 거의 많이 지급되었습니다.')
        if(!staff) {
            return message.reply('이 기능을 사용할 수 없습니다.\n스태프 봇을 사용해 역할을 얻어주세요.')
        }
    }
})

client.on('message', async message => {

    const channel = client.channels.cache.get('815114144465944606');
    let muterole = message.guild.roles.cache.find(x => x.name === 'Muted')

    let blacklisted = require('./util/forbiddenWord.json')
  
      let foundInText = false;
      for (var i in blacklisted) { 
        if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true
      }
  
      if (foundInText) {
          message.member.roles.add(muterole)
          const embed = new MessageEmbed()
          .setColor('#FF0000')
          .setTitle('Log')
          .addField('Type', 'Mute')
          .addField('User', `${message.author}`)
          .addField('Reason', "욕설 사용")
          .addField('Time', "∞")
          channel.send(embed)
  }
  }
  );

  let Cooltime_Mute = 5 * 1000
  let User_Mute_Object = {}
  client.on('message', async message => {
    let MuteRole = client.guilds.cache.get(message.guild.id).roles.cache.find(r => r.name === "Muted").id
    if (message.author.bot || !message.guild) return
    MuteRole = message.guild.roles.cache.find(r => r.id == MuteRole)
    const M_Author = message.author
    if (!message.member.hasPermission('ADMINISTRATOR')) {
      let Author_Object = User_Mute_Object[M_Author.id]
      if (!Author_Object) {
        User_Mute_Object[M_Author.id] = {
          time: 0,
          interval: null,
          muted: false
        }
      } else {
        if (Author_Object.interval != null) {
          if (Cooltime_Mute >= Author_Object.time && !Author_Object.muted) {
            message.member.roles.add(MuteRole)
            Author_Object.muted = true
            const embed = new MessageEmbed()
            .setTitle('Log')
            .addField('Type', "Mute")
            .addField('User', `${message.author}`)
            .addField('Reason', '도배')
            .addField('Time', "∞")
            message.channel.send(embed)
          }
          clearInterval(Author_Object.interval)
          Author_Object.interval = null
        } else if (!Author_Object.muted) {
          Author_Object.interval = setInterval(() => {
            Author_Object.time++
          }, 1)
        }
        Author_Object.time = 0
      }
    }
  })

client.on('message', (message) => {
  if(message.content.startsWith == `${prefix}hellothisisverification`) {
    message.channel.send('로쏠호#7854(813634627800530984)')
  }
})












keepAlive();
client.login(token);