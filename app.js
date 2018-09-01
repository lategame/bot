require('dotenv').load()
const mongoose = require('mongoose')
const chalk = require('chalk')
const gay_handler = require('./controllers')
mongoose.Promise = global.Promise

// db
mongoose.connect(process.env.MONGO_URI, {
	useMongoClient: true,
})
mongoose.connection
	.once('open', () => console.log(`Database ${chalk.blueBright('online!')}`))
	.on('error', err => console.log(chalk.red(err)))



// discord client
const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
	console.log(`Bot ${chalk.blueBright('online!')}`);
});

client.on('message', message => {
	gay_handler.handleMessage(message)

	if (message.content.toLowerCase() === "!count") {
		gay_handler.printCount(message.channel)
	}

	if (message.content.toLowerCase() === "!imgay") {
		gay_handler.printPersonalCount(message.author.id, message.channel)	
	}

	if (message.content.toLowerCase() === "!raise") {
		gay_handler.raiseHand(message.channel)
	}

	if (message.content.toLocaleLowerCase() === "!shlum") {
		gay_handler.shlumCommand(message.channel)
	}

})

client.login(process.env.TOKEN);
