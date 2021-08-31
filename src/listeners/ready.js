module.exports = {
    name: "ready",
    exec: async (client) => {
      client.user.setPresence({
        status: "online",  // You can show online, idle, and dnd
        activity: {
            name: "Help",  // The message shown
            type: "LISTENING", // PLAYING, WATCHING, LISTENING, STREAMING,
        }
      });
        console.log(`Logged in as ${client.user.tag}`);

        if (client.spotify) await client.spotify.requestToken();

        const nodes = [...client.manager.nodes.values()];
        for (const node of nodes) {
            try {
                await node.connect();
            } catch (e) {
                client.manager.emit("error", e, node);
            }
        }
    }
};
