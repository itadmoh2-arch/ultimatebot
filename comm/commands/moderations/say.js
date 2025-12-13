const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Faire parler le bot")
    .addStringOption(opt =>
      opt.setName("message").setDescription("Message à envoyer").setRequired(true)
    ),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({ content: "❌ Permission refusée.", ephemeral: true });
    }

    const msg = interaction.options.getString("message");
    await interaction.channel.send(msg);
    await interaction.reply({ content: "✅ Message envoyé.", ephemeral: true });
  },
};
