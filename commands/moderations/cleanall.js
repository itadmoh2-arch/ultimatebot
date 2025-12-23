const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clean-all")
    .setDescription("🧹 Supprime tous les messages du bot dans tous les salons")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.reply({
      content: "🧹 Nettoyage des salons en cours...",
      ephemeral: true,
    });

    const guild = interaction.guild;
    const botId = interaction.client.user.id;

    for (const channel of guild.channels.cache.values()) {
      if (!channel.isTextBased() || channel.isDMBased()) continue;

      try {
        let fetched;
        do {
          fetched = await channel.messages.fetch({ limit: 100 });
          const botMessages = fetched.filter(
            (m) => m.author.id === botId
          );

          for (const msg of botMessages.values()) {
            await msg.delete().catch(() => {});
          }
        } while (fetched.size >= 2);
      } catch (err) {
        continue;
      }
    }
  },
};
