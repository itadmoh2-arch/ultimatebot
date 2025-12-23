const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("giveaway")
    .setDescription("Créer un giveaway (auto reroll silencieux)")
    .addStringOption((opt) =>
      opt.setName("prix").setDescription("Prix à gagner").setRequired(true)
    )
    .addIntegerOption((opt) =>
      opt
        .setName("durée")
        .setDescription("Durée en HEURES")
        .setRequired(true)
    ),

  async execute(interaction) {
    const prize = interaction.options.getString("prix");
    const hours = interaction.options.getInteger("durée");
    const duration = hours * 60 * 60 * 1000;

    const embed = new EmbedBuilder()
      .setColor("#ff00ff")
      .setTitle("🎁 GIVEAWAY 🎁")
      .setDescription(
        `🏆 **Prix :** ${prize}\n\n` +
        `⏳ **Durée :** ${hours} heure(s)\n\n` +
        `📅 **Fin :** <t:${Math.floor(
          (Date.now() + duration) / 1000
        )}:R>\n\n` +
        "👇 Clique sur le bouton pour participer"
      )
      .setFooter({ text: "Bonne chance 🍀" })
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("giveaway_join")
        .setLabel("🎉 Participer")
        .setStyle(ButtonStyle.Success)
    );

    const msg = await interaction.channel.send({
      embeds: [embed],
      components: [row],
    });

    const participants = new Set();

    const collector = msg.createMessageComponentCollector({
      time: duration,
    });

    collector.on("collect", async (i) => {
      if (participants.has(i.user.id)) {
        return i.reply({
          content: "❌ Tu participes déjà.",
          ephemeral: true,
        });
      }

      participants.add(i.user.id);
      await i.reply({
        content: "✅ Participation enregistrée !",
        ephemeral: true,
      });
    });

    collector.on("end", async () => {
      if (participants.size === 0) {
        return msg.edit({
          content: "❌ Giveaway annulé : aucune participation.",
          components: [],
        });
      }

      const participantsArray = [...participants];

      let winner = null;

      while (participantsArray.length > 0 && !winner) {
        const randomIndex = Math.floor(
          Math.random() * participantsArray.length
        );
        const userId = participantsArray.splice(randomIndex, 1)[0];

        try {
          const member = await msg.guild.members.fetch(userId);
          if (member) {
            winner = member;
          }
        } catch {
          // membre invalide → reroll silencieux
        }
      }

      if (!winner) {
        return msg.edit({
          content: "❌ Aucun gagnant valide trouvé.",
          components: [],
        });
      }

      msg.edit({
        content: `🎉 **GAGNANT :** ${winner} remporte **${prize}** !`,
        components: [],
      });
    });

    await interaction.reply({
      content: "🎁 Giveaway lancé avec succès !",
      ephemeral: true,
    });
  },
};