const config = require('../../lib/config.json')
module.exports = {
    name: "mute",
    description: "Mute a member from your server",
    usage: ".ㅡ <사용자> 이유",
    aliases: ["m", "nospeak", "ㅡ", "ㅡㅕㅅㄷ", "뮤트", "닥쳐", "닥처", "아닥"],
    
    async run (client, message, args) { // 뮤트 명령어를 쳤을때 아래에 있는것을 실행
      if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("권한이 없습니다");
  
      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  
      if (!user) return message.channel.send("사용자를 입력하지 않았습니다.\n사용법 : " + module.exports.usage);
  
        // define mute role and if the mute role doesnt exist then create one
        let muterole = message.channel.guild.roles.cache.find(r => r.name == "Muted")
        if (!muterole) { // 뮤트 역할이 없을경우 아래에 있는것처럼 새로만듬
            message.channel.send('**Muted** 라는 역할이 없습니다.')
            try {
                muterole = await message.guild.roles.create({
                    data: {
                        name: "Muted",
                        color: config.colors.dark,
                    },
                    reason: reason,
                })
                muterole.setPermissions(new BitField(0)); // 어떤 권한도 없는 상태
                message.guild.channels.cache.forEach(async (channel, id) => { // 채널에서 muted 권한에게 아무 것도 안 주게 함.
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false,
                    })
                })
            } catch (e) {
                console.log(e.stack);
            }
        }
  
      let reason = args.slice(1).join(" ");
      if (reason === null) reason = "사유 없음"
  
      user.roles.add(muterole);
  
      await message.channel.send(`${user} 닥쳐라. 이 새끼야.`)


      user.send(`${user.author}님 안녕하세요. 당신은 \`\`${message.guild.name}\`\` 에서 뮤트먹었습니다.\n이유 -> ${reason}`)
    }
  }