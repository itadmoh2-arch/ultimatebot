const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("ℹ️ Infos sur le bot"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor("#22c55e")
      .setTitle("🤖 Informations du bot")
      .addFields(
        { name: "Nom", value: interaction.client.user.username },
        { name: "Serveurs", value: `${interaction.client.guilds.cache.size}` },
        { name: "Ping", value: `${interaction.client.ws.ping}ms` }
      )
      .setFooter({ text: "UltimateBot" });

    await interaction.reply({ embeds: [embed] });
  },
};
