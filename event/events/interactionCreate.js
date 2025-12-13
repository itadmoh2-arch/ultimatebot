const {
  EmbedBuilder,
} = require("discord.js");

module.exports = async (client, interaction) => {

  // ===== BOUTONS (SONDAGE) =====
  if (interaction.isButton()) {
    const msg = interaction.message;

    if (!msg.embeds.length) return;

    const embed = EmbedBuilder.from(msg.embeds[0]);

    let yes = parseInt(embed.fields[0].value);
    let no = parseInt(embed.fields[1].value);

    if (interaction.customId === "poll_yes") yes++;
    if (interaction.customId === "poll_no") no++;

    embed.spliceFields(
      0,
      2,
      { name: "👍 Oui", value: `${yes}`, inline: true },
      { name: "👎 Non", value: `${no}`, inline: true }
    );

    return interaction.update({ embeds: [embed] });
  }

};
