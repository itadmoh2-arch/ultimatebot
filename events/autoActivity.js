module.exports = (client) => {
  const TARGET_CHANNELS = [
    "💬・trade-chat",
    "📈・trading"
  ];

  const MESSAGES = [
    "💱 Quel trade vous regardez aujourd’hui ?",
    "🍌 Quel a été votre meilleur trade récemment ?",
    "🛡️ Petit rappel : utilisez le middleman pour les gros trades.",
    "📊 Quel item est le plus rentable en ce moment selon vous ?"
  ];

  setInterval(async () => {
    for (const guild of client.guilds.cache.values()) {
      for (const channelName of TARGET_CHANNELS) {
        const channel = guild.channels.cache.find(
          c => c.name === channelName && c.isTextBased()
        );
        if (!channel) continue;

        // Récupère le dernier message
        const messages = await channel.messages.fetch({ limit: 1 });
        const lastMessage = messages.first();
        if (!lastMessage) continue;

        const now = Date.now();
        const lastTime = lastMessage.createdTimestamp;

        // Si le salon est actif depuis moins de 45 minutes → on ne fait rien
        if (now - lastTime < 45 * 60 * 1000) continue;

        // Choix d’un message aléatoire
        const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

        channel.send(msg);
      }
    }
  }, 30 * 60 * 1000); // vérifie toutes les 30 minutes
};
