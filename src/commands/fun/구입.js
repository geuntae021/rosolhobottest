const db = require('quick.db');
const Discord = require('discord.js');
const config = require('../../lib/prefix.json')
const prefix = config.mainprefix

module.exports = {
    name: "구입",
    description: "Buy an item from the store",

    async run (client, message, args) {
        let purchase = args.join(" ");
        if(!purchase) return message.channel.send('뭐를 구매할거예요')
        let items = await db.fetch(message.author.id, { items: [] }); // 아이템 값을 가져온다
        let amount = await db.fetch(`money_${message.guild.id}_${message.author.id}`) // amount 라는 값을 가져온다

        if(purchase === '자동차'){
            if(amount < 500) return message.channel.send('돈 부족');
            db.subtract(`money_${message.guild.id}_${message.author.id}`, 500);
            db.push(message.author.id, "자동차");
            message.channel.send(`구입완료 ${prefix}인벤 으로 확인하세요.`)
        }
        if(purchase === '닌텐도'){
            if(amount < 600) return message.channel.send('돈 부족');
            db.subtract(`money_${message.guild.id}_${message.author.id}`, 600);
            db.push(message.author.id, "닌텐도");
            message.channel.send(`구입완료 ${prefix}인벤 으로 확인하세요.`)
        }
        if(purchase === '아이패드'){
            if(amount < 100000) return message.channel.send('돈 부족');
            db.subtract(`money_${message.guild.id}_${message.author.id}`, 100000);
            db.push(message.author.id, "아이패드");
            message.channel.send(`구입완료 ${prefix}인벤 으로 확인하세요.`)
        }
            if(purchase === '비행기'){
            if(amount < 150000) return message.channel.send('돈 부족');
            db.subtract(`money_${message.guild.id}_${message.author.id}`, 150000);
            db.push(message.author.id, "아이패드");
            message.channel.send(`구입완료 ${prefix}인벤 으로 확인하세요.`)
        }
            if(purchase === '철검'){
            if(amount < 1500000) return message.channel.send('돈 부족');
            db.subtract(`money_${message.guild.id}_${message.author.id}`, 1500000);
            db.push(message.author.id, "철검");
            message.channel.send(`구입완료 ${prefix}인벤 으로 확인하세요.`)
        }
            if(purchase === '아이폰'){
                if(amount < 600000) return message.channel.send('돈 부족');
                db.subtract(`money_${message.guild.id}_${message.author.id}`, 600000)
                db.push(message.author.id, "아이폰");
                message.channel.send(`구입완료 ${prefix}인벤 으로 확인하세요.`)
            }
    }
}