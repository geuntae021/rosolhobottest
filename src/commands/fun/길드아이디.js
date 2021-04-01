module.exports = {
    name: "길드아이디",
    aliases: ["guildid", "길드 아이디", "ㄱㄷㅇㅇㄷ", "ㄱㄷ ㅇㅇㄷ"],
    run: async(client, message, args) => {
        message.channel.send(`아이디 따왔어요 ${message.guild.id}`)
    }
}