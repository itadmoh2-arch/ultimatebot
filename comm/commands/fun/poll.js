const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("📊 Créer un sondage")
    .addStringOption(opt =>
      opt.setName("question")
        .setDescription("Question du sondage")
        .setRequired(true)
    ),

  async execute(interaction) {
    const question = interaction.options.getString("question");

    const embed = new EmbedBuilder()
      .setColor("#2563eb")
      .setTitle("📊 Sondage")
      .setDescription(question)
      .addFields(
        { name: "👍 Oui", value: "0", inline: true },
        { name: "👎 Non", value: "0", inline: true }
      )
      .setFooter({ text: "Vote avec les boutons ci-dessous" });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("poll_yes")
        .setLabel("👍 Oui")
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId("poll_no")
        .setLabel("👎 Non")
        .setStyle(ButtonStyle.Danger)
    );

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
