const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("🧹 Supprimer des messages")
    .addIntegerOption(opt =>
      opt.setName("nombre").setDescription("Nombre").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger("nombre");

    await interaction.channel.bulkDelete(amount, true).catch(() => {});
    await interaction.reply({ content: "🧹 Messages supprimés.", ephemeral: true });
  },
};
