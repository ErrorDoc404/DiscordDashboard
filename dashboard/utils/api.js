const fetch = require('node-fetch');

const TOKEN = process.env.DASHBOARD_BOT_TOKEN;

async function getBotGuilds(){
  const response = await fetch('http://discord.com/api/v8/users/@me/guilds', {
    method: 'GET',
    header: {
      Authorization: `Bot ${TOKEN}`
    }
  });
  return response.json();
}

module.exports = {getBotGuilds};
