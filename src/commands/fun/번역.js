const translate = require('translate-google')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "번역",
    description: "Korea -> English!",
    aliases: ['translate', "번역하기"],
    run: async(client, message, args) => {
        let msg; // msg 라는 값을 만든다
        msg = args.slice(1).join(" ");
        translate(args.join(" "), {to: 'en'}).then(res => {
            const embed = new MessageEmbed()
            .setTitle('번역 결과')
            .addField('번역 전 메시지', msg)
            .addField('번역 후 메시지', res)
            message.channel.send(embed)
        }).catch(err => {
            message.channel.send('번역 중 오류가 발생해 번역을 실패했습니다..')
            console.log(`Sorry.. Error Event Actived.. Error: ${err}`)
        })
    }
}