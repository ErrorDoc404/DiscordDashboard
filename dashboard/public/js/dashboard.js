const index = new Vue({
  el: '#app-dashboard',
  data: {
    user: {
      _id: null,
      discordId: null,
      discordTag: null,
      avatar: null,
      guilds: null
    },
    guilds: [],
    cache: []
  },
  created () {
    fetch('/api/auth')
      .then(res => res.json())
      .then(json => {
        this.user = json
      });

    fetch('/api/discord/guilds')
      .then(res => res.json())
      .then(json => {
        this.guilds = json.guilds
    });

    fetch('/api/discord/bot/cache')
      .then(res => res.json())
      .then(json => {
        this.cache = json
    });
  }
})
