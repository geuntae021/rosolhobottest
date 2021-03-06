const { MessageEmbed } = require("discord.js");
const moment = require('moment-timezone');
moment.locale('ko-KR');

module.exports = {
    name: "serverinfo",
    aliases: ["서버정보", "정보서버", "정보 서버", "서정", "server-info", "서버 정보"],
    category: "information",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle(`${message.guild.name} 서버의 정보`)
            .setColor(0xffff00)
            .setThumbnail(message.guild.iconURL())
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp()
            .addField('👑 서버 주인', `**${message.guild.owner.user.username}\n(ID: ${message.guild.ownerID})**`)
            .addField('🌎 서버 지역', `**${region[message.guild.region]}**`)
            .addField('🆔 서버 ID', `**${message.guild.id}**`)
            .addField('🙎‍♂️ 서버 유저', `**ALL: ${message.guild.memberCount} (유저: ${message.guild.members.cache.filter(member => !member.user.bot).size} | 봇: ${message.guild.members.cache.filter(member => member.user.bot).size})**`)
            .addField('🎂 서버 생일', `**${moment(message.guild.createdAt).tz('Asia/seoul').format('YYYY년 MM월 DD일 dd요일 HH시 mm분')}**`)
            .addField('💬 채팅 채널', `**ALL: ${message.guild.channels.cache.size} (TEXT: ${message.guild.channels.cache.filter(x => x.type === "text").size} | CATEGORY: ${message.guild.channels.cache.filter(x => x.type === "category").size} | VOICE: ${message.guild.channels.cache.filter(x => x.type === "voice").size})**`)
            .addField('💤 잠수 채널', `**${message.guild.afkChannel ? message.guild.afkChannel.name : "없음"}**`, true)

        message.guild.afkChannel ? embed.addField('⏰ 잠수 시간 제한', `**${afkTimeout[message.guild.afkTimeout]}**`, true) : null

        embed.addField('🔐 서버 보안', `**${verificationLevel[message.guild.verificationLevel]}**`)
            .addField('📱 2단계 인증', `**${mfaLevel[message.guild.mfaLevel]}**`)
            .addField('📡 시스템 메세지 채널', `**${message.guild.systemChannel ? message.guild.systemChannel : "없음"}**`)
            .addField('📺 유해 미디어 콘텐츠 필터', `**${explicitContentFilter[message.guild.explicitContentFilter]}**`)
            .addField('🔔 알림 설정 초기화', `**${defaultMessageNotifications[message.guild.defaultMessageNotifications]}**`)
            .addField('🎙 음성 채널에 접속한 수', `**${message.guild.voiceStates.cache.size}명**`)
            .addField(`${client.emojis.cache.find(x => x.name === "boost")} 서버 부스트 레벨`, `**${message.guild.premiumTier}레벨**`, true)
            .addField(`${client.emojis.cache.find(x => x.name === "boost")} 서버 부스트 횟수`, `**${message.guild.premiumSubscriptionCount}회**`, true)


        const roleembed = new MessageEmbed().setColor(0xffff00).setTitle(`${message.guild.name} 서버의 역할 (${message.guild.roles.cache.filter(r => r.id !== message.guild.id).size}개)`).setDescription(message.guild.roles.cache.filter(r => r.id !== message.guild.id).map(e => e).join(", "));

        if (message.guild.roles.cache.filter(r => r.id !== message.guild.id).size > 25) {
            roleembed.setDescription(message.guild.roles.cache.filter(n => n.id !== message.guild.id).map(e => e).splice(0, 25).join(", "));
            roleembed.setTitle(`${message.guild.name} 서버의 역할 (${message.guild.roles.cache.filter(r => r.id !== message.guild.id).size}개 중 25개)`);
        };


        const emojiembed = new MessageEmbed().setColor(0xffff00).setTitle(`${message.guild.name} 서버의 이모지 (${message.guild.emojis.cache.size}개)`).setDescription(message.guild.emojis.cache.map(e => e.toString()).join(" "));

        if (message.guild.emojis.cache.size > 30) {
            emojiembed.setDescription(message.guild.emojis.cache.map(e => e.toString()).splice(0, 30).join(" "));
            emojiembed.setTitle(`${message.guild.name} 서버의 이모지 (${message.guild.emojis.cache.size}개 중 30개)`);
        };

        message.channel.send(embed);

        if (message.member.hasPermission("MANAGE_ROLES") && message.guild.me.hasPermission("MANAGE_ROLES") && message.guild.roles.cache.filter(e => e.id !== message.guild.id).size !== 0) message.channel.send(roleembed)
        if (message.member.hasPermission("MANAGE_EMOJIS") && message.guild.me.hasPermission("MANAGE_EMOJIS") && message.guild.emojis.cache.size !== 0) message.channel.send(emojiembed);
    }
};

const mfaLevel = ['없음', '활성화'];

const explicitContentFilter = {
    DISABLED: '미디어 콘텐츠를 스캔하지 않음',
    MEMBERS_WITHOUT_ROLES: '역할 없는 멤버의 미디어 콘텐츠를 스캔',
    ALL_MEMBERS: '모든 멤버의 미디어 콘텐츠를 스캔'
};

const defaultMessageNotifications = {
    ALL: '모든 메세지',
    MENTIONS: '@mentions만'
};

const region = {
    "south-korea": ':flag_kr: 대한민국 (South Korea)',
    "japan": ':flag_jp: 일본 (Japan)**',
    "brazil": ":flag_br: 브라질 (Brazil)",
    "india": ":flag_in: 인도 (India)",
    "europe": ":flag_eu: 유럽 (Europe)",
    "hongkong": ":flag_hk: 홍콩 (Hong Kong)",
    "russia": ":flag_ru: 러시아 (Russia)",
    "southafrica": ":flag_za: 남아프리카 공화국 (South Africa)",
    "singapore": ":flag_sg: 싱가포르 (Singapore)",
    "sydney": ":flag_au: 시드니 (Sydney)",
    "us-central": ":flag_us: 미국 중부 (US Central)",
    "us-east": ":flag_us: 미국 동부 (US East)",
    "us-south": ":flag_us: 미국 남부 (US South)",
    "us-west": ":flag_us: 미국 서부 (US West)"
};

const afkTimeout = {
    60: '1분',
    300: '5분',
    900: '15분',
    1800: '30분',
    3600: '1시간'
};

const verificationLevel = {
    NONE: '없음 (제한 없음)',
    LOW: '낮음 (이메일 인증이 완료된 Discord 계정이어야 해요.)',
    MEDIUM: '중간 (또한, Discord에 가입한 지 5분이 지나야 되요.)',
    HIGH: '높음 (또한, 이 서버의 멤버가 된 지 10분이 지나야 돼요.)',
    VERY_HIGH: '매우 높음 (휴대폰 인증이 완료된 Discord 계정이어야 해요.)'
};