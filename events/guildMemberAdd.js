const { EmbedBuilder } = require("discord.js");

module.exports = async (client, member) => {
  if (member.user.bot) return;

  try {
    const channel = member.guild.channels.cache.find(
      c => c.name === "👋・bienvenue"
    );

    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor("#00ffcc")
      .setTitle("👋 Bienvenue sur le serveur !")
      .setDescription(
        `Bienvenue ${member} 🚀\n\n` +
        "📊 Serveur de trading sérieux\n" +
        "🛡️ Middle Man disponibles\n" +
        "🎧 Vocaux automatiques\n\n" +
        "👉 Lis les règles pour commencer\n" +
        "👉 Bon trading à toi 📈"
      )
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setImage(
        "https://cdn.discordapp.com/attachments/1449082278495129620/1452246371217182730/IMG_0146.jpg"
      )
      .setFooter({
        text: `Nous sommes maintenant ${member.guild.memberCount} membres`,
      })
      .setTimestamp();

    await channel.send({ embeds: [embed] });

  } catch (error) {
    console.error("❌ Erreur welcome :", error);
  }
};