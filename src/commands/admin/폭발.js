const sleep = ms => new Promise(r => setTimeout(r, ms))
module.exports = {
    name: "폭발",
    aliases: ["폭18", "폭8"],
    categories: "채널 관리",
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send('이 명령어를 사용하려면 **채널 관리** 권한이 필요합니다.')
        }

        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send('봇이 채널을 관리 할 권한이 없습니다.')
        }

        message.channel.send('폭★발')
        await sleep(5000)
        message.channel.delete();
    }
}