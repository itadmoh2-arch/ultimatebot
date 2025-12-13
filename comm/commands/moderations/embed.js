const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Créer un embed")
    .addStringOption(opt =>
      opt.setName("texte").setDescription("Texte de l'embed").setRequired(true)
    ),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({ content: "❌ Permission refusée.", ephemeral: true });
    }

    const texte = interaction.options.getString("texte");

    const embed = new EmbedBuilder()
      .setColor("#22c55e")
      .setDescription(texte)
      .setTimestamp();

    await interaction.channel.send({ embeds: [embed] });
    await interaction.reply({ content: "✅ Embed envoyé.", ephemeral: true });
  },
};
