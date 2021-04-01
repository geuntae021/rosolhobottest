const global = require('../../lib/sub/global.json')

module.exports = client => {
  let activities = [
      `${client.guilds.cache.size}개의 서버에서 노는중`,
      `${client.channels.cache.size}개의 채널에 접속중`,
      `${client.users.cache.size}명의 유저들과 노는중`
  ];
  let i = 0;
  setInterval(() => client.user.setActivity(`;help | ${activities[i++ % activities.length]}`, { type: "WATCHING" }), 15000)

  log(`${redChalk(global.application_name)} ${greenChalk('to online')}`);
};
