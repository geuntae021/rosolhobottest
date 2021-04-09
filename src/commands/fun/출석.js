const { now } = require("moment");
const fs = require('fs')

module.exports = {
    name: "attendance",
    aliases: ["ㅊㅊ", "cc", "출첵"],
    run: async (client, message, args) => {
        if(message.author.bot) return; // 무한반복 방지 코드
        if(message.author.id === client.user.id) return; // 로그인한 봇으로 채팅 입력 방지
    
        const id = message.author.id; // 유저의 고유 아이디 (29586984602340 이런식)
        const name = message.author.username
    
        const filePath = require('../../userdata') // 유저 정보가 만들어지는 파일
    
        // TODO 파일이 없다면 파일을 생성해야함
        !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null; // 파일이 없다면 만듬
    
        const user = JSON.parse(fs.readdirSync(filePath, "utf-8"));
    
        // 오늘의 날짜
        const day = new Date();
        const date = "" + day.getFullYear() + day.getMonth() + day.getDate();
        if(user.id) {
            if(user.date === date) {
                message.reply('출석은 하루에 한번만..')
            }
        }
        }
    }