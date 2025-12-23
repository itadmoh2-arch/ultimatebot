const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("🖼 Avatar d’un membre")
    .addUserOption(opt =>
      opt.setName("membre").setDescription("Membre").setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("membre") || interaction.user;

    const embed = new EmbedBuilder()
      .setColor("#22c55e")
      .setTitle(`🖼 Avatar de ${user.username}`)
      .setImage(user.displayAvatarURL({ size: 1024, dynamic: true }));

    await interaction.reply({ embeds: [embed] });
  },
};
