const { ChannelType } = require("discord.js");

const creators = [
  {
    trigger: "➕ Créer un voc duo",
    prefix: "👥 Voc Duo",
    limit: 2,
  },
  {
    trigger: "➕ Créer un voc trio",
    prefix: "👨‍👩‍👧 Voc Trio",
    limit: 3,
  },
];

module.exports = async (client, oldState, newState) => {
  // ===== CRÉATION =====
  if (newState.channel) {
    const config = creators.find(
      c => c.trigger === newState.channel.name
    );

    if (config) {
      const guild = newState.guild;
      const member = newState.member;

      const tempChannel = await guild.channels.create({
        name: `${config.prefix} | ${member.user.username}`,
        type: ChannelType.GuildVoice,
        parent: newState.channel.parentId ?? null,
        userLimit: config.limit,
      });

      await member.voice.setChannel(tempChannel).catch(() => {});
    }
  }

  // ===== SUPPRESSION =====
  if (oldState.channel) {
    const isTemp = creators.some(c =>
      oldState.channel.name.startsWith(c.prefix)
    );

    if (isTemp && oldState.channel.members.size === 0) {
      await oldState.channel.delete().catch(() => {});
    }
  }
};
