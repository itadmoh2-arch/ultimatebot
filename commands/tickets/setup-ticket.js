const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup-ticket")
    .setDescription("Créer le panneau de tickets (devenir Middle Man / Staff)")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor("#00ffcc")
      .setTitle("🎟️ Ouvrir un ticket")
      .setDescription(
        "Choisis le type de demande que tu souhaites faire 👇\n\n" +
        "🤝 **Devenir Middle Man**\n" +
        "🧑‍⚖️ **Devenir Modérateur**\n" +
        "🛠️ **Devenir Staff**\n" +
        "🆘 **Support général**"
      );

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("ticket_middleman")
        .setLabel("🤝 Devenir Middle Man")
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId("ticket_moderateur")
        .setLabel("🧑‍⚖️ Devenir Modérateur")
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId("ticket_staff")
        .setLabel("🛠️ Devenir Staff")
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId("ticket_support")
        .setLabel("🆘 Support")
        .setStyle(ButtonStyle.Success)
    );

    await interaction.reply({
      embeds: [embed],
      components: [row],
    });
  },
};