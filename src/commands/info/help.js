  
const pagination = require('discord.js-pagination');
const Discord = require('discord.js');

module.exports = {
    name: "help",
    aliases: ["h", "commands", "ㅗ디ㅔ", "도움", "도움말", "헬프"],
    description: "The help command, what do you expect?",

    async run (client, message, args){

        //Sort your commands into categories, and make seperate embeds for each category
        
        const moderation = new Discord.MessageEmbed()
        .setTitle('관리자명령어')
        .addField('`;킥`', '유저에게 싸대기를 갈깁니다. (킥)')
        .addField('`;밴`', '유저를 밴')
        .addField('`;뮤트`', '유저를 뮤트')
        .addField('`;언뮤트`', '멤버를 언뮤트')
        .addField('`;공지`', '관리자 명령어')
        .addField('`;봇공지`', '관리자 명령어')
        .addField('`;패치`', '관리자 명령어')
        .addField('`;경고`', '유저에게 경고를 줄수있습니다. 최대 3개')
        .addField('`;경고삭제`', '유저에 경고를 삭제할수있습니다.')
        .addField('`;슬로우 (슬로우모드를 할 시간)`', '채널에 슬로우모드를 걸수있습니다. 참고: 0초는 불가능 하느므로 기본 명령어 쪽으로 가셔서 ;슬로우제거 명령어를 보시면 됩니다.')
        .setTimestamp()

        const fun = new Discord.MessageEmbed()
        .setTitle('게임 명령어 페이지')
        .addField('`;가위바위보`', '한판 붙죠 ^^7')
        .setTimestamp()

        const utility = new Discord.MessageEmbed()
        .setTitle('돈기능(도박은 아직없음)')
        .addField('`;내돈`', '자신의 돈을 확인가능')
        .addField('`;돈받기`', '돈을 받을수있음')
        .addField('`;상품`', ';구입으로 살수있는 상품이 나옵니다.')
        .addField('`;구입`', ';상품에 나오는 물건을 살수있습니다.')
        .addField('`;인벤`', '구입한 아이템을 확인할수있습니다.')
        .setTimestamp()
        
        const u1 = new Discord.MessageEmbed()
        .setTitle('기본 명령어')
        .addField('`;핑`', '봇의 응답핑')
        .addField('`;날씨`', ';날씨를 입력하고 자신이 사는 도시 아니면 군 이름을 쓰시면 날씨정보가 나옵니다.')
        .addField('`;유저정보`', '유저의 정보를 보여줍니다.')
        .addField('`;청소`', '채팅을 청소합니다')
        .addField('`;네이버실검`', '네이버 인기급상승 순위를 보여줍니다')
        .addField('`;투표`', 'A 명령어는 알겠지')
        .addField('`;단축`', 'URL단축가능')
        .addField('`;공식서버`', '공식서버 링크를 줍니다.')
        .addField('`;한강온도`', '한강온도 볼수있음!')
        .addField('`;깃허브`', ';깃허브 자신의 깃허브 이름 치시면 자신의 깃허브 정보가 나옵니다.')
        .addField('`;슬로우제거`', '슬로우모드가 되있는 채널에 슬로우모드를 제거 합니다.')
        .setTimestamp()

        const 패치예정 = new Discord.MessageEmbed()
        .setTitle('곧 패치될 명령어')
        .addField('`;코로나`', '2학기 시절에 코로나가 없어질거 같아서')
        .setTimestamp()

        const patch = new Discord.MessageEmbed()
        .setTitle('패치된 명령어')
        .addField('`;네이버실검`', '네이버 측에서 막으므로 네이버실검.js 파일 지웠습니다')
        .addField('`;욕설리스트`', '계속 오류가 나서 패치')
        .addField('`;돈벌기`', 'message.channel.send 가 작동되지 않는 것 같아서 패치')
        .setTimestamp()

        const music = new Discord.MessageEmbed()
        .setTitle('음악 명령어 (새로생김)')
        .addField('`;volume`', '볼륨을 설정합니다.')
        .addField('`;skip`', '음악을 넘깁니다.')
        .addField('`;play`', '음악을 재생합니다\n예: **;play (영상링크 또는 영상이름)**')
        .addField('`;pause`', '음악을 잠시 정지합니다. (;resume 로 다시시작)')
        .addField('`;resume`', '일시정지된 음악을 다시 시작합니다.')
        .addField('`;stop`', '음악을 그냥 아예 정지합니다')
        .setTimestamp()

        const pages = [
                moderation,
                fun,
                utility,
                u1,
                패치예정,
                patch,
                music
        ]

        const emojiList = ["⏪", "⏩"];

        const timeout = '1200000';

        pagination(message, pages, emojiList, timeout)
    }
}

