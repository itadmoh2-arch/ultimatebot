const {
  SlashCommandBuilder,
  ChannelType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup-vocal")
    .setDescription("Ajoute les voice chats de trade")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const guild = interaction.guild;

    await interaction.reply({
      content: "🎧 Ajout des vocaux de trade en cours...",
      ephemeral: true,
    });

    // Chercher ou créer la catégorie VOCAL
    let vocalCategory = guild.channels.cache.find(
      (c) =>
        c.type === ChannelType.GuildCategory &&
        c.name === "🎧 VOCAL"
    );

    if (!vocalCategory) {
      vocalCategory = await guild.channels.create({
        name: "🎧 VOCAL",
        type: ChannelType.GuildCategory,
      });
    }

    const tradeVocals = [
      "📊 Trade général",
      "🤝 Trade duo",
      "👥 Trade trio",
      "👨‍👩‍👦 Trade team",
      "💬 Discussion trading",
      "🔊 Analyse vocale",
    ];

    for (const name of tradeVocals) {
      const exists = guild.channels.cache.find(
        (c) =>
          c.type === ChannelType.GuildVoice &&
          c.name === name
      );

      if (!exists) {
        await guild.channels.create({
          name,
          type: ChannelType.GuildVoice,
          parent: vocalCategory.id,
        });
      }
    }

    await interaction.editReply(
      "✅ Vocaux de trade ajoutés dans 🎧 VOCAL"
    );
  },
};