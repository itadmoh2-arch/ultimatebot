const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Afficher le bouton de ticket"),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: "❌ Permission refusée.",
        ephemeral: true,
      });
    }

    const button = new ButtonBuilder()
      .setCustomId("open_ticket")
      .setLabel("🎫 Ouvrir un ticket")
      .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.channel.send({
      content: "Besoin d’aide ? Clique sur le bouton ci-dessous 👇",
      components: [row],
    });

    await interaction.reply({ content: "✅ Bouton envoyé.", ephemeral: true });
  },
};
