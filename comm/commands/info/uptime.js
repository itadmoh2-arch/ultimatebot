const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("⏱ Temps de fonctionnement du bot"),

  async execute(interaction) {
    const uptime = interaction.client.uptime / 1000;
    const h = Math.floor(uptime / 3600);
    const m = Math.floor((uptime % 3600) / 60);

    await interaction.reply(`⏱ En ligne depuis **${h}h ${m}m**`);
  },
};
