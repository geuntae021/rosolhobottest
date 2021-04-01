const config = require('../../lib/config.json')

module.exports = {
    name: "재시작",
    category: "fun",
    run: async (client, message, args) => {
        if (message.author.id !== config.owner) {
            return message.channel.send(`이 명령을 사용할 수 없습니다!`)
        }
        await message.channel.send(`봇 재시작 중 ...`) || await message.channel.send('재시작끝')
        process.exit();
    }
}