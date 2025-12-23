const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("👤 Infos d’un membre")
    .addUserOption(opt =>
      opt.setName("membre").setDescription("Membre").setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("membre") || interaction.user;

    const embed = new EmbedBuilder()
      .setColor("#22c55e")
      .setTitle(`👤 ${user.username}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: "ID", value: user.id },
        { name: "Créé le", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:D>` }
      );

    await interaction.reply({ embeds: [embed] });
  },
};
