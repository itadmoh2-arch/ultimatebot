const {
  ChannelType,
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");

module.exports = async (client, interaction) => {
  /* ===========================
     SLASH COMMANDS
  ============================ */
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        interaction.followUp({
          content: "❌ Une erreur est survenue.",
          ephemeral: true,
        });
      } else {
        interaction.reply({
          content: "❌ Une erreur est survenue.",
          ephemeral: true,
        });
      }
    }
    return;
  }

  /* ===========================
     TICKETS — BOUTONS
  ============================ */
  if (!interaction.isButton()) return;

  const guild = interaction.guild;
  const user = interaction.user;

  /* ---- OUVERTURE TICKET ---- */
  if (interaction.customId.startsWith("ticket_")) {
    const type = interaction.customId.replace("ticket_", "");

    // Empêcher plusieurs tickets
    const alreadyOpen = guild.channels.cache.find(
      (c) => c.name === `ticket-${user.id}`
    );
    if (alreadyOpen) {
      return interaction.reply({
        content: "❌ Tu as déjà un ticket ouvert.",
        ephemeral: true,
      });
    }

    const channel = await guild.channels.create({
      name: `ticket-${user.id}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: guild.id, // @everyone
          deny: [PermissionFlagsBits.ViewChannel],
        },
        {
          id: user.id, // créateur
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
          ],
        },
      ],
    });

    const embed = new EmbedBuilder()
      .setTitle("🎫 Ticket ouvert")
      .setColor("#00ffcc")
      .setDescription(
        `Bonjour ${user},\n\n` +
        `📌 **Type de ticket :** ${type}\n` +
        `Un membre du staff va te répondre.\n\n` +
        `Merci d’expliquer clairement ton problème.`
      )
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("close_ticket")
        .setLabel("🔒 Fermer le ticket")
        .setStyle(ButtonStyle.Danger)
    );

    await channel.send({
      content: `<@${user.id}>`,
      embeds: [embed],
      components: [row],
    });

    await interaction.reply({
      content: "✅ Ton ticket a été créé.",
      ephemeral: true,
    });
    return;
  }

  /* ---- FERMETURE TICKET ---- */
  if (interaction.customId === "close_ticket") {
    await interaction.reply({
      content: "🗑️ Fermeture du ticket...",
      ephemeral: true,
    });

    setTimeout(() => {
      interaction.channel.delete().catch(() => {});
    }, 3000);
  }
};