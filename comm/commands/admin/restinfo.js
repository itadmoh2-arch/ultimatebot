const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reset-info")
    .setDescription("🧹 Supprime tous les messages info envoyés par le bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.reply({
      content: "🧹 Nettoyage des messages du bot en cours...",
      ephemeral: true,
    });

    const guild = interaction.guild;
    const botId = interaction.client.user.id;

    for (const channel of guild.channels.cache.values()) {
      if (!channel.isTextBased() || channel.isDMBased()) continue;

      try {
        const messages = await channel.messages.fetch({ limit: 50 });

        const botMessages = messages.filter(
          (m) => m.author.id === botId && m.mentions.everyone
        );

        for (const msg of botMessages.values()) {
          await msg.delete().catch(() => {});
        }
      } catch (e) {}
    }
  },
};
