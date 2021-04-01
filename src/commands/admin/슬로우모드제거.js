module.exports = {
    name:'슬로우제거',

    async run (client, message, args) {
        message.channel.setRateLimitPerUser("0")
        try {
            message.channel.send(`${message.author.username}, 슬로우 모드가 꺼졌습니다.`)
        } catch (error) {
            console.error(error);
        }
    } 
}