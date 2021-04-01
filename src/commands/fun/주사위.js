const { MessageEmbed, Message } = require("discord.js");
const Client = require('../../settings/Client.js')

module.exports = {
  name: "주사위",
  description: "rolls a die",
  category: "misc",

  //IntelliSense
  /**
   * @param {Message} message
   * @param {Client} client
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const randomRoll = Math.floor(Math.random() * 100) + 1;
    const roll = new MessageEmbed();
    roll.setTitle("나온 숫자는? 두구두구 ");
    roll.setDescription(`||${randomRoll}||입니다.`);
    roll.setColor("C83838");
    roll.setFooter(`${client.user.tag}`);
    message.channel.send(roll);
  },
};