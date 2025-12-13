const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

function explainChannel(name) {
  // ANALYSES
  if (name.includes("analyse")) {
    return `
📊 **Salon Analyses de Marché**

Ce salon est dédié aux **analyses techniques et fondamentales**.

✅ Autorisé :
• graphiques
• scénarios de trade
• zones clés (support / résistance)
• explications claires

❌ Interdit :
• spam
• signaux sans explication
• messages hors trading

Objectif : **comprendre le marché, pas copier aveuglément**.
`;
  }

  // SIGNAUX
  if (name.includes("signal")) {
    return `
💹 **Salon Signaux de Trading**

Ce salon sert à publier des **signaux de trading**.

📌 Chaque signal doit être clair :
• entrée
• stop-loss
• take-profit

⚠️ Avertissement :
Le trading comporte des risques.
Chaque membre est **responsable de ses décisions**.

❌ Aucun débat hors sujet ici.
`;
  }

  // SUPPORT / TICKET
  if (name.includes("ticket") || name.includes("support")) {
    return `
🎫 **Salon Support**

Ce salon est réservé à l’**assistance et aux tickets**.

📝 Merci de :
• expliquer ton problème clairement
• fournir des preuves si nécessaire
• rester respectueux

❌ Pas de spam
❌ Pas de discussions inutiles

Le staff te répondra dès que possible.
`;
  }

  // LOGS
  if (name.includes("log")) {
    return `
📚 **Salon Logs**

Ce salon est **entièrement automatique**.

📌 Il sert à enregistrer :
• actions de modération
• événements serveur
• changements importants

❌ Aucun message manuel n’est autorisé ici.
`;
  }

  // DISCUSSION / GÉNÉRAL
  if (name.includes("général") || name.includes("discussion")) {
    return `
💬 **Salon Discussion**

Ce salon est dédié aux **échanges entre membres**.

✅ Autorisé :
• discussions
• questions
• entraide

❌ Interdit :
• insultes
• spam
• publicité

Merci de respecter les règles du serveur.
`;
  }

  // PAR DÉFAUT
  return `
📌 **Salon d’information**

Ce salon a un **objectif précis**.
Merci de respecter son usage et les règles du serveur.

En cas de doute, contacte le staff.
`;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("explain")
    .setDescription("Explique clairement à quoi sert ce salon"),

  async execute(interaction) {
    if (
      !interaction.member.permissions.has(
        PermissionFlagsBits.ManageChannels
      )
    ) {
      return interaction.reply({
        content: "❌ Permission refusée.",
        ephemeral: true,
      });
    }

    await interaction.deferReply({ ephemeral: true });

    const channelName = interaction.channel.name.toLowerCase();
    const texte = explainChannel(channelName);

    const embed = new EmbedBuilder()
      .setColor("#22c55e")
      .setTitle("📌 À quoi sert ce salon ?")
      .setDescription(texte)
      .setFooter({ text: "Merci de respecter l’organisation du serveur" })
      .setTimestamp();

    await interaction.channel.send({
      content: "@everyone",
      embeds: [embed],
    });

    await interaction.editReply("✅ Explication envoyée.");
  },
};
