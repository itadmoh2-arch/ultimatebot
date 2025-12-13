const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Test de latence du bot"),

  async execute(interaction) {
    await interaction.deferReply();
    await interaction.editReply("Pong 🏓");
  },
};
