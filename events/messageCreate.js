const cooldownSalon = new Map();
const cooldownKeywords = new Map();

module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const content = message.content.toLowerCase();
  const channelName = message.channel.name;

  /* ===============================
     1️⃣ LOGIQUE PAR SALON (SOFT)
     =============================== */

  const salonRules = {
    "📸・preuves": "📸 Ce salon est réservé uniquement aux **preuves de trade**.",
    "⭐・vouch": "⭐ Ce salon est réservé aux **retours après un trade**. Utilise **#trade-chat** pour discuter.",
    "❌・litiges": "❌ Merci de poster ici uniquement des **litiges sérieux avec preuves**."
  };

  const salonReply = salonRules[channelName];

  if (salonReply) {
    // Ignore si pièce jointe (preuve)
    if (message.attachments.size === 0 && message.content.length < 60) {
      const key = `${message.author.id}-${message.channel.id}`;
      const now = Date.now();

      if (!cooldownSalon.has(key) || now - cooldownSalon.get(key) > 5 * 60 * 1000) {
        cooldownSalon.set(key, now);

        await message.reply({
          content: salonReply,
          allowedMentions: { repliedUser: false }
        });
      }
    }
  }

  /* ===============================
     2️⃣ DÉTECTION DE MOTS-CLÉS
     =============================== */

  const keywordRules = [
    {
      words: ["scam", "arnaque"],
      reply: "⚠️ Pour éviter les arnaques, utilise toujours un **middleman officiel**."
    },
    {
      words: ["preuve", "preuves"],
      reply: "📸 Les preuves doivent être postées dans **📸・preuves**."
    },
    {
      words: ["middleman", "mm"],
      reply: "🛡️ Besoin d’un middleman ? Ouvre un **ticket** dans la catégorie support."
    },
    {
      words: ["ticket"],
      reply: "🎫 Pour toute demande, ouvre un **ticket** dans la catégorie support."
    }
  ];

  const keywordMatch = keywordRules.find(rule =>
    rule.words.some(word => content.includes(word))
  );

  if (keywordMatch) {
    const key = `${message.author.id}-${message.channel.id}`;
    const now = Date.now();

    if (!cooldownKeywords.has(key) || now - cooldownKeywords.get(key) > 5 * 60 * 1000) {
      cooldownKeywords.set(key, now);

      await message.reply({
        content: keywordMatch.reply,
        allowedMentions: { repliedUser: false }
      });
    }
  }
};
