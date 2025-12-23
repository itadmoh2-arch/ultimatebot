const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Informations du serveur")
    .addSubcommand(sub =>
      sub
        .setName("salon")
        .setDescription("Expliquer à quoi servent les salons")
    ),

  async execute(interaction) {
    const message = `
@everyone

📘 **INFORMATION**

📜 règles  
👉 Lis les règles du serveur (obligatoire)

👋 bienvenue  
👉 Messages d’accueil et infos importantes

📢 annonces  
👉 Annonces officielles du staff

🎁 giveaway  
👉 Concours et cadeaux

📅 calendrier  
👉 Événements à venir

❓ faq  
👉 Questions fréquentes

📌 infos-serveur  
👉 Infos générales du serveur

🤖 bot-infos  
👉 Infos sur les bots

━━━━━━━━━━━━━━

📈 **TRADING**

📈 trading  
👉 Discussions trading

💬 trade-chat  
👉 Parler librement des trades

⭐ vouch  
👉 Avis et réputation

📸 preuves  
👉 Preuves de trades

❌ litiges  
👉 Problèmes et conflits

💰 petit-trade  
👉 Petits trades

💎 gros-trade  
👉 Gros trades

🇮🇹 trade-en-cours  
👉 Trades actifs

🤝 middleman-info  
👉 Infos middleman

📄 conditions-trade  
👉 Conditions à respecter

━━━━━━━━━━━━━━

🛡️ **MIDDLE MAN & STAFF**

📋 devenir-middleman  
👉 Créez un ticket pour devenir **Middle Man**

🧑‍⚖️ devenir-moderateur  
👉 Créez un ticket pour devenir **Modérateur**

🛠️ devenir-staff  
👉 Créez un ticket pour devenir **Staff**

━━━━━━━━━━━━━━

🎧 **VOCAL**

🤝 trade duo / trio / TEAM  
👉 Vocaux de trade

➕ créer un vocal  
👉 Vocaux automatiques (supprimés quand vides)

━━━━━━━━━━━━━━

🆘 **SUPPORT**

🎟️ ticket-middleman  
🎟️ ticket-moderateur  
🎟️ ticket-staff  
🎟️ ticket-support  

📩 contact-staff  
👉 Contacter le staff
`;

    await interaction.reply({
      content: message,
      allowedMentions: { parse: ["everyone"] },
    });
  },
};