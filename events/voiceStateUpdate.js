const {
  ChannelType,
  PermissionsBitField
} = require("discord.js");

module.exports = async (client, oldState, newState) => {
  try {
    // 🔹 Salons déclencheurs EXACTS (doivent correspondre à Discord)
    const triggerChannels = [
      "➕ Créer un voc duo",
      "➕ Créer un voc trio",
      "➕ Créer un vocal TEAM"
    ];

    // 🔹 L'utilisateur rejoint un salon vocal
    if (!oldState.channel && newState.channel) {
      const channelName = newState.channel.name;

      // ❌ Si ce n’est pas un salon trigger → on ignore
      if (!triggerChannels.includes(channelName)) return;

      const guild = newState.guild;
      const member = newState.member;
      const category = newState.channel.parent;

      // 🔢 Limite d’utilisateurs selon le type
      let userLimit = 0;
      if (channelName.includes("duo")) userLimit = 2;
      if (channelName.includes("trio")) userLimit = 3;
      if (channelName.includes("TEAM")) userLimit = 10;

      // 🏗️ Création du vocal privé
      const createdChannel = await guild.channels.create({
        name: `🔊 ${member.user.username}`,
        type: ChannelType.GuildVoice,
        parent: category,
        userLimit: userLimit,
        permissionOverwrites: [
          {
            id: guild.id,
            deny: [PermissionsBitField.Flags.Connect]
          },
          {
            id: member.id,
            allow: [
              PermissionsBitField.Flags.Connect,
              PermissionsBitField.Flags.ManageChannels,
              PermissionsBitField.Flags.MoveMembers
            ]
          }
        ]
      });

      // 🚪 Déplacer l'utilisateur dedans
      await member.voice.setChannel(createdChannel);

      // 🧹 Supprimer le vocal quand il est vide
      const interval = setInterval(async () => {
        if (!createdChannel || createdChannel.members.size === 0) {
          clearInterval(interval);
          await createdChannel.delete().catch(() => {});
        }
      }, 5000);
    }
  } catch (error) {
    console.error("❌ Erreur voiceStateUpdate :", error);
  }
};