const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("📊 Infos du serveur"),

  async execute(interaction) {
    const g = interaction.guild;

    const embed = new EmbedBuilder()
      .setColor("#22c55e")
      .setTitle(`📊 ${g.name}`)
      .addFields(
        { name: "Membres", value: `${g.memberCount}`, inline: true },
        { name: "Créé le", value: `<t:${Math.floor(g.createdTimestamp / 1000)}:D>`, inline: true }
      );

    await interaction.reply({ embeds: [embed] });
  },
};
