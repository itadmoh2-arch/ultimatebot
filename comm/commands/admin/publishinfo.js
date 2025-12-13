const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("publish-info")
    .setDescription("📌 Publie automatiquement les messages explicatifs dans tous les salons")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.reply({
      content: "📢 Publication des messages en cours...",
      ephemeral: true,
    });

    const guild = interaction.guild;

    const messages = {
      "règles": {
        title: "📜 Règlement du serveur",
        description: "Merci de respecter les règles afin de garder une bonne ambiance.\nTout non-respect pourra entraîner des sanctions.",
      },
      "annonces": {
        title: "📢 Annonces officielles",
        description: "Toutes les annonces importantes du serveur seront publiées ici.",
      },
      "bienvenue": {
        title: "👋 Bienvenue",
        description: "Souhaitez la bienvenue aux nouveaux membres et prenez connaissance du serveur.",
      },
      "général": {
        title: "💬 Discussion générale",
        description: "Salon principal pour discuter librement avec la communauté.",
      },
      "log": {
        title: "📊 Logs automatiques",
        description: "Ce salon est réservé aux **logs automatiques du bot**.\n❌ Aucun message manuel autorisé.",
      },
      "trade": {
        title: "📈 Trading",
        description: "Partage de trades, analyses et discussions liées au trading.",
      },
      "support": {
        title: "🛠 Support",
        description: "Besoin d’aide ? Pose ta question ici et l’équipe te répondra.",
      },
    };

    for (const channel of guild.channels.cache.values()) {
      if (!channel.isTextBased() || channel.isDMBased()) continue;

      const key = Object.keys(messages).find((k) =>
        channel.name.includes(k)
      );

      if (!key) continue;

      const embed = new EmbedBuilder()
        .setColor("#2f3136")
        .setTitle(messages[key].title)
        .setDescription(messages[key].description)
        .setFooter({ text: "Organisation du serveur" })
        .setTimestamp();

      try {
        await channel.send({
          content: "@everyone",
          embeds: [embed],
        });
      } catch (e) {}
    }
  },
};
