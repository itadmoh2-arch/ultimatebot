 require("dotenv").config();

 const {
   Client,
   GatewayIntentBits,
   Collection,
   REST,
   Routes,
 } = require("discord.js");

 const fs = require("fs");
 const path = require("path");
 const express = require("express");

 // ===============================
 // 🔹 CLIENT DISCORD
 // ===============================
 const client = new Client({
   intents: [
     GatewayIntentBits.Guilds,
     GatewayIntentBits.GuildMessages,
     GatewayIntentBits.MessageContent,
     GatewayIntentBits.GuildMembers,
     GatewayIntentBits.GuildVoiceStates,
   ],
 });

 // ===============================
 // 🔹 COLLECTION DES COMMANDES
 // ===============================
 client.commands = new Collection();

 // ===============================
 // 📦 CHARGEMENT DES COMMANDES
 // ===============================
 const commands = [];
 const commandsPath = path.join(__dirname, "commands");

 if (fs.existsSync(commandsPath)) {
   const commandFolders = fs.readdirSync(commandsPath);

   for (const folder of commandFolders) {
     const folderPath = path.join(commandsPath, folder);
     const commandFiles = fs
       .readdirSync(folderPath)
       .filter((file) => file.endsWith(".js"));

     for (const file of commandFiles) {
       const filePath = path.join(folderPath, file);
       const command = require(filePath);

       if (!command.data || !command.execute) continue;

       client.commands.set(command.data.name, command);
       commands.push(command.data.toJSON());
     }
   }
 }

 // ===============================
 // 🌐 REST DISCORD (SLASH COMMANDS)
 // ===============================
 const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

 // ===============================
 // 🔄 AUTO-ACTIVITY
 // ===============================
 const autoActivity = require("./events/autoActivity");

 // ===============================
 // ✅ READY
 // ===============================
 client.once("ready", async () => {
   console.log(`🤖 UltimateBot lancé : ${client.user.tag}`);

   // Lance l’auto-activité
   autoActivity(client);

   try {
     await rest.put(Routes.applicationCommands(client.user.id), {
       body: commands,
     });
     console.log("✅ Commandes slash enregistrées");
   } catch (error) {
     console.error("❌ Erreur enregistrement commandes :", error);
   }
 });

 // ===============================
 // 🎯 INTERACTIONS (SLASH COMMANDS)
 // ===============================
 client.on("interactionCreate", async (interaction) => {
   if (!interaction.isChatInputCommand()) return;

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
 });

 // ===============================
 // ⚡ CHARGEMENT DES EVENTS
 // ===============================
 const eventsPath = path.join(__dirname, "events");

 if (fs.existsSync(eventsPath)) {
   const eventFiles = fs
     .readdirSync(eventsPath)
     .filter((file) => file.endsWith(".js") && file !== "autoActivity.js");

   for (const file of eventFiles) {
     const event = require(path.join(eventsPath, file));
     const eventName = file.replace(".js", "");

     client.on(eventName, (...args) => event(client, ...args));
   }
 }

 // ===============================
 // 🌐 SERVEUR EXPRESS (RAILWAY 24/7)
 // ===============================
 const app = express();
 const PORT = process.env.PORT || 3000;

 app.get("/", (req, res) => {
   res.send("UltimateBot is running 🚀");
 });

 app.listen(PORT, () => {
   console.log(`🌍 Web server running on port ${PORT}`);
 });

 // ===============================
 // 🔐 CONNEXION DISCORD
 // ===============================
 client.login(process.env.TOKEN);