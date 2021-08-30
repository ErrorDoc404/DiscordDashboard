const index = new Vue({
  el: '#app-index',
  data: {
    user: {
      _id: null,
      discordId: null,
      discordTag: null,
      avatar: null,
      guilds: null
    },
    servers: [],
    guilds: []
  },
  created () {
    fetch('/api/auth')
      .then(res => res.json())
      .then(json => {
        this.user = json
      });

    fetch('/api/discord/bot')
      .then(res => res.json())
      .then(json => {
        this.servers = json
      });

      fetch('/api/discord/guilds')
        .then(res => res.json())
        .then(json => {
          this.guilds = json
        });
  }
})
