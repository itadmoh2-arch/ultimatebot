const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  ChannelType,
} = require("discord.js");

function getExplanation(channel) {
  const name = channel.name.toLowerCase();
  const category = channel.parent?.name.toLowerCase() || "";

  // ===== TRADING ZONE =====
  if (category.includes("trading zone")) {
    return `📈 **TRADING ZONE**

Ce salon fait partie de l’espace **Trading Zone**.

📌 Utilisation :
• analyses de marché
• stratégies
• signaux
• discussions liées au trading

❌ Interdit :
• spam
• messages hors trading
• publicités

⚠️ Le trading comporte des risques.`;
  }

  // ===== TRADING SÉCURISÉ =====
  if (category.includes("trading sécurisé") || category.includes("middleman")) {
    return `🔐 **TRADING SÉCURISÉ**

Ce salon est lié aux **transactions sécurisées / middleman**.

📌 Ici tu peux :
• ouvrir une transaction
• fournir des preuves
• suivre un échange

❌ Toute transaction hors cadre est à tes risques.`;
  }

  // ===== SUPPORT =====
  if (category.includes("support") || name.includes("ticket")) {
    return `🎫 **SUPPORT**

Ce salon est destiné au **support et à l’assistance**.

📝 Merci de :
• expliquer clairement ton problème
• rester respectueux
• attendre la réponse du staff

❌ Pas de spam.`;
  }

  // ===== LOGS =====
  if (category.includes("log")) {
    return `📚 **LOGS AUTOMATIQUES**

Ce salon est réservé aux **logs du serveur**.

📌 Tout est automatique :
• modération
• salons
• membres
• sécurité

❌ Aucun message manuel autorisé.`;
  }

  // ===== COMMUNAUTÉ =====
  if (category.includes("communauté") || category.includes("discussion")) {
    return `💬 **COMMUNAUTÉ**

Ce salon sert aux **échanges entre membres**.

✅ Autorisé :
• discussions
• questions
• entraide

❌ Interdit :
• insultes
• spam
• publicité`;
  }

  // ===== PAR DÉFAUT (RARE) =====
  return `📌 **INFORMATION**

Ce salon a un usage spécifique.
Merci de respecter son objectif et les règles du serveur.

En cas de doute, contacte le staff.`;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("explain-all")
    .setDescription("Explique automatiquement tous les salons selon leur catégorie"),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: "❌ Administrateur requis.",
        ephemeral: true,
      });
    }

    await interaction.deferReply({ ephemeral: true });

    const channels = interaction.guild.channels.cache.filter(
      ch => ch.type === ChannelType.GuildText && ch.parent
    );

    let count = 0;

    for (const channel of channels.values()) {
      const texte = getExplanation(channel);

      const embed = new EmbedBuilder()
        .setColor("#22c55e")
        .setTitle("📌 À quoi sert ce salon ?")
        .setDescription(texte)
        .setFooter({ text: "Organisation du serveur" })
        .setTimestamp();

      await channel.send({
        content: "@everyone",
        embeds: [embed],
      });

      count++;
    }

    await interaction.editReply(
      `✅ Explication envoyée dans **${count} salons**.`
    );
  },
};
