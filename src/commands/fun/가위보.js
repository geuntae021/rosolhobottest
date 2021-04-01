const discord = require('discord.js')
module.exports = {
	name: "가위바위보",
	aliases: ['가위보'],
	description: "play a game of rock, paper and scissors",
	run: async(client, message, args) => {
		let embed = new discord.MessageEmbed()
		.setTitle("가위바위보 게임")
		.setDescription("플레이에 반응하십시오!")
		.setTimestamp()
		let msg = await message.channel.send(embed)
		await msg.react("✊")
		await msg.react("✌️")
		await msg.react("🖐")

		const filter = (reaction, user) => {
            return ['✊', '✌️', '🖐'].includes(reaction.emoji.name) && user.id === message.author.id;
        }

        const choices = ['✊', '✌️', '🖐']
        const me = choices[Math.floor(Math.random() * choices.length)]
        msg.awaitReactions(filter, {max:1, time: 60000, error: ["time"]}).then(
        	async(collected) => {
        		const reaction = collected.first()
        		let result = new discord.MessageEmbed()
        		.setTitle("결과")
        		.addField("당신의 선택", `${reaction.emoji.name}`)
        		.addField("내 선택", `${me}`)
			await msg.edit(result)
        		if ((me === "✊" && reaction.emoji.name === "✌️") ||
                (me === "🖐" && reaction.emoji.name === "✊") ||
                (me === "✌️" && reaction.emoji.name === "🖐")) {
                    message.reply("님이 졌어요!");
            } else if (me === reaction.emoji.name) {
                return message.reply("님 무승부에요!");
            } else {
                return message.reply("님이 이겼어요!");
            }
        })
        .catch(collected => {
                message.reply('제 시간에 응답하지 않았으므로 처리가 취소되었습니다!');
            })
}
}