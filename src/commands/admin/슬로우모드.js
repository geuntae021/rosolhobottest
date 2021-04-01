module.exports = {
    name: "슬로우",
    aliases: ["슬로우모드", "ㅅㄹㅇ"],

    async run (client, message, args) {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Your No Permissions!")
        const number = args.join(" ");
        if (args[0] === "0") return message.channel.send(`${message.author.username}, 슬로우 모드를 0 초로 설정할 수 없습니다. 끄고 싶다면 \`.슬로우제거 \``)
        if (!number) return message.channel.send(`${message.author.username}, 번호를 입력하십시오!`)
        if (isNaN (args[0])) return message.channel.send(`Hey ${message.author.username}, 그것은 숫자가 아닙니다!`)
        message.channel.setRateLimitPerUser(number)
        try {
            message.channel.send(`슬로우 모드가 ${number} 초로 설정되었습니다!`)
        } catch (error) {
            console.error(erro)
        }
    }
}