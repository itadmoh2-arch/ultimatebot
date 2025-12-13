const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require("discord.js");

const CATEGORIES = [
  "📘 INFORMATION",
  "💬 COMMUNAUTÉ",
  "🎙️ VOCAL",
  "🛠️ MODÉRATION",
  "📚 LOGS",
  "🎫 SUPPORT",
  "🎉 ÉVÉNEMENTS",
  "🤖 BOT & TECH",
];

async function getOrCreateCategory(guild, name) {
  let cat = guild.channels.cache.find(
    c => c.name === name && c.type === ChannelType.GuildCategory
  );
  if (!cat) {
    cat = await guild.channels.create({ name, type: ChannelType.GuildCategory });
  }
  return cat;
}

async function getOrCreateChannel(guild, name, type, parent, options = {}) {
  let chan = guild.channels.cache.find(
    c => c.name === name && c.type === type
  );
  if (!chan) {
    chan = await guild.channels.create({
      name,
      type,
      parent,
      ...options,
    });
  }
  return chan;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Setup complet du serveur")
    .addSubcommand(sub =>
      sub.setName("run").setDescription("Créer tous les salons")
    )
    .addSubcommand(sub =>
      sub.setName("reset").setDescription("Supprimer tous les salons du setup")
    ),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({ content: "❌ Administrateur requis.", ephemeral: true });
    }

    const g = interaction.guild;
    const sub = interaction.options.getSubcommand();

    // ===== RESET =====
    if (sub === "reset") {
      await interaction.reply("🧨 Reset en cours...");
      for (const name of CATEGORIES) {
        const cat = g.channels.cache.find(
          c => c.name === name && c.type === ChannelType.GuildCategory
        );
        if (cat) {
          for (const ch of cat.children.cache.values()) {
            await ch.delete().catch(() => {});
          }
          await cat.delete().catch(() => {});
        }
      }
      return interaction.followUp("✅ Reset terminé.");
    }

    // ===== SETUP =====
    await interaction.reply("⚙️ Setup intelligent en cours...");

    const info = await getOrCreateCategory(g, "📘 INFORMATION");
    await getOrCreateChannel(g, "📜・règles", ChannelType.GuildText, info.id);
    await getOrCreateChannel(g, "👋・bienvenue", ChannelType.GuildText, info.id);
    await getOrCreateChannel(g, "📢・annonces", ChannelType.GuildText, info.id);
    await getOrCreateChannel(g, "❓・faq", ChannelType.GuildText, info.id);
    await getOrCreateChannel(g, "📌・infos-serveur", ChannelType.GuildText, info.id);
    await getOrCreateChannel(g, "📣・partenariats", ChannelType.GuildText, info.id);

    const com = await getOrCreateCategory(g, "💬 COMMUNAUTÉ");
    const comTexts = [
      "💬・général",
      "🗣️・discussion-libre",
      "😂・mèmes",
      "📸・photos",
      "🎮・gaming",
      "🎵・musique",
      "📊・sondages",
      "💡・suggestions",
    ];
    for (const name of comTexts) {
      await getOrCreateChannel(g, name, ChannelType.GuildText, com.id);
    }

    const voc = await getOrCreateCategory(g, "🎙️ VOCAL");
    const vocs = [
      "🔊 Général",
      "🎧 Chill",
      "🎮 Gaming",
      "🎤 Talk libre",
      "🎶 Music Room",
      "🔒 Privé",
    ];
    for (const name of vocs) {
      await getOrCreateChannel(g, name, ChannelType.GuildVoice, voc.id);
    }

    const mod = await getOrCreateCategory(g, "🛠️ MODÉRATION");
    await getOrCreateChannel(g, "🛠️・staff-chat", ChannelType.GuildText, mod.id);
    await getOrCreateChannel(g, "📂・demandes-staff", ChannelType.GuildText, mod.id);
    await getOrCreateChannel(g, "🚨・signalements", ChannelType.GuildText, mod.id);
    await getOrCreateChannel(g, "🧾・notes-modération", ChannelType.GuildText, mod.id);
    await getOrCreateChannel(g, "📋・actions-staff", ChannelType.GuildText, mod.id);

    const logs = await getOrCreateCategory(g, "📚 LOGS");
    const logTexts = [
      "📘・log-messages",
      "📗・log-membres",
      "📙・log-salons",
      "📕・log-rôles",
      "📓・log-modération",
      "🧠・log-sécurité",
    ];
    for (const name of logTexts) {
      await getOrCreateChannel(g, name, ChannelType.GuildText, logs.id, {
        permissionOverwrites: [
          { id: g.roles.everyone, deny: [PermissionFlagsBits.ViewChannel] },
        ],
      });
    }

    const sup = await getOrCreateCategory(g, "🎫 SUPPORT");
    await getOrCreateChannel(g, "🎫・support", ChannelType.GuildText, sup.id);
    await getOrCreateChannel(g, "📨・contact-staff", ChannelType.GuildText, sup.id);
    await getOrCreateChannel(g, "❗・plaintes", ChannelType.GuildText, sup.id);

    const events = await getOrCreateCategory(g, "🎉 ÉVÉNEMENTS");
    await getOrCreateChannel(g, "🎉・events", ChannelType.GuildText, events.id);
    await getOrCreateChannel(g, "🏆・tournois", ChannelType.GuildText, events.id);
    await getOrCreateChannel(g, "📅・planning", ChannelType.GuildText, events.id);

    const bot = await getOrCreateCategory(g, "🤖 BOT & TECH");
    await getOrCreateChannel(g, "🤖・bot-commands", ChannelType.GuildText, bot.id);
    await getOrCreateChannel(g, "⚙️・bot-logs", ChannelType.GuildText, bot.id);
    await getOrCreateChannel(g, "🧪・tests", ChannelType.GuildText, bot.id);

    await interaction.followUp("✅ Setup complet terminé.");
  },
};
