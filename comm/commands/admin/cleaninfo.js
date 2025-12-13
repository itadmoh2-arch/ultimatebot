const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clean-info")
    .setDescription("🧹 Supprime rapidement les messages info du bot dans ce salon")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const channel = interaction.channel;
    const botId = interaction.client.user.id;

    await interaction.reply({
      content: "🧹 Nettoyage en cours...",
      ephemeral: true,
    });

    let fetched;
    do {
      fetched = await channel.messages.fetch({ limit: 100 });

      const toDelete = fetched.filter(
        (m) => m.author.id === botId && m.mentions.everyone
      );

      await channel.bulkDelete(toDelete, true).catch(() => {});
    } while (fetched.size >= 2);
  },
};
