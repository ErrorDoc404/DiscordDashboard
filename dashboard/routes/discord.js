const router = require('express').Router();
// const {getBotGuilds} = require('../utils/api');
const User = require('../database/schemas/User');
const { Permissions } = require("discord.js");
const client = require("../../src/bot.js");
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

router.get('/guilds', async (req, res ) => {
  if(req.user){
    req.user.guilds.map((g) => {
      g.MANAGE_GUILD = new Permissions(g.permissions).has("MANAGE_GUILD", true);
      g.IN_GUILD = client.guilds.cache.has(g.id);
      return g;
    });
    res.send(req.user.guilds);
  }
});

router.get('/bot', async (req, res ) => {
    res.send(client);
});

module.exports = router;
