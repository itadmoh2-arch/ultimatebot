const { EmbedBuilder } = require("discord.js");

module.exports = async (client, member) => {
  const channel = member.guild.channels.cache.find(
    ch => ch.name === "👋・bienvenue"
  );
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setColor("#22c55e")
    .setTitle("👋 Bienvenue sur le serveur !")
    .setDescription(
      `Bienvenue à **${member.user.username}** 🎉\n` +
      `Nous sommes maintenant **${member.guild.memberCount} membres**`
    )
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setImage("https://cdn.discordapp.com/attachments/1449082278495129620/1449138953520152846/58c691494590c6345a21c69de02344b2.jpg?ex=693dcf52&is=693c7dd2&hm=58599932f02e0e4311547a70bdadacf521040834add2f39a8e4a7b113733d438&")
    .setFooter({ text: "Bon trading et bonne discussion 🚀" })
    .setTimestamp();

  channel.send({ embeds: [embed] });
};
