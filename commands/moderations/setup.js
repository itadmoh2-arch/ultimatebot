const {
  SlashCommandBuilder,
  ChannelType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Setup intelligent du serveur (safe, sans suppression)"),
  async execute(interaction) {
    const guild = interaction.guild;

    if (
      !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
    ) {
      return interaction.reply({
        content: "❌ Tu dois être administrateur.",
        ephemeral: true,
      });
    }

    await interaction.reply({
      content: "⚙️ Setup en cours...",
      ephemeral: true,
    });

    // ====== HELPERS ======
    async function ensureCategory(name) {
      let cat = guild.channels.cache.find(
        (c) => c.type === ChannelType.GuildCategory && c.name === name
      );
      if (!cat) {
        cat = await guild.channels.create({
          name,
          type: ChannelType.GuildCategory,
        });
      }
      return cat;
    }

    async function createChannels(list, parent) {
      for (const name of list) {
        const exists = guild.channels.cache.find(
          (c) => c.name === name && c.parentId === parent.id
        );
        if (!exists) {
          await guild.channels.create({
            name,
            type: ChannelType.GuildText,
            parent: parent.id,
          });
        }
      }
    }

    async function createVoice(name, parent) {
      const exists = guild.channels.cache.find(
        (c) => c.name === name && c.type === ChannelType.GuildVoice
      );
      if (!exists) {
        await guild.channels.create({
          name,
          type: ChannelType.GuildVoice,
          parent: parent.id,
        });
      }
    }

    // ====== INFORMATION ======
    const infoCat = await ensureCategory("📘 INFORMATION");
    await createChannels(
      [
        "📜・règles",
        "👋・bienvenue",
        "📢・annonces",
        "🎁・giveaway",
        "📅・calendrier",
        "❓・faq",
        "📌・infos-serveur",
        "🤖・bot-infos",
      ],
      infoCat
    );

    // ====== TRADING ======
    const tradeCat = await ensureCategory("📈 TRADING");
    await createChannels(
      [
        "📈・trading",
        "💬・trade-chat",
        "⭐・vouch",
        "📸・preuves",
        "❌・litiges",
        "💰・petit-trade",
        "💎・gros-trade",
        "📊・trade-en-cours",
        "🤝・middleman-info",
        "📄・conditions-trade",
      ],
      tradeCat
    );

    // ====== SUPPORT ======
    const supportCat = await ensureCategory("🛠️ SUPPORT");
    await createChannels(
      [
        "🎫・ticket-middleman",
        "🎫・ticket-modo",
        "📩・contact-staff",
      ],
      supportCat
    );

    // ====== VOCAL ======
    const vocalCat = await ensureCategory("🎧 VOCAL");

    await createVoice("🤝 vocal-general", vocalCat);
    await createVoice("🔊 Général", vocalCat);
    await createVoice("🎮 Gaming", vocalCat);
    await createVoice("🔐 Privé", vocalCat);

    // Vocaux AUTO (triggers)
    await createVoice("➕ Créer un voc duo", vocalCat);
    await createVoice("➕ Créer un voc trio", vocalCat);
    await createVoice("➕ Créer un vocal TEAM", vocalCat);

    await interaction.editReply("✅ Setup terminé avec succès.");
  },
};