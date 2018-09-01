const GayCount = require('./gaycount')
let dickcount = 0

exports.handleMessage = (message) => {
	let { author, content } = message
	let count = (content.match(/gay/gi) || []).length
	let nigger_count = (content.match(/nigger/gi) || []).length

	if (count > 0 && author.id !== "480387811065987112" && author.id !== "266544331505139712" && message.content !=="!imgay") {
		incrementGayCount(author.id, author.username, count)
	}

	if (nigger_count > 0) {
		niggerWatch(message.channel)
	}

}

exports.shlumCommand = (channel) => {
	let shlumArray = [
		"https://cdn.discordapp.com/attachments/257101542308446210/484983197080485888/Screenshot_20180803-195633_Snapchat.jpg",
		"https://cdn.discordapp.com/attachments/257101542308446210/484983197533339659/Screenshot_20180511-215403_Snapchat.jpg",
		"https://cdn.discordapp.com/attachments/257101542308446210/484983321898647567/Screenshot_20171024-225505.png",
		"https://cdn.discordapp.com/attachments/257101542308446210/484983323228372992/Screenshot_20170413-210051.png",
		"https://cdn.discordapp.com/attachments/257101542308446210/484983323660255253/Screenshot_20170417-031116.png",
		"https://cdn.discordapp.com/attachments/257101542308446210/484983447677304842/Screenshot_20170428-034400.png",
		"https://cdn.discordapp.com/attachments/257101542308446210/484983448113774594/Screenshot_20170428-034355.png",
		"https://cdn.discordapp.com/attachments/257101542308446210/484983475779403807/Snapchat-228853021.jpg",
		"https://cdn.discordapp.com/attachments/257101542308446210/484983476395835393/received_1193570383993129.jpeg",
		"https://cdn.discordapp.com/attachments/257101542308446210/484983476395835394/received_1193658187317682.jpeg",
		"https://cdn.discordapp.com/attachments/266495643671986176/484982072751161344/Screenshot_20170920-132852.png",
	]

	let item = shlumArray[Math.floor(Math.random()*shlumArray.length)]

	channel.send(item)
}

exports.raiseHand = (channel) => {
	let dickpic = "Fuck you, faggot"
	dickcount++
	let arms = require('./raise')	
	let item = arms[Math.floor(Math.random()*arms.length)]

	if (dickcount > 15) {
		dickcount = 0
		channel.send(dickpic)	
	}
	else {
		channel.send(item)
	}
}

exports.printCount = (channel) => {
	let leaderboard_string = "♥🌈 Gay Leaderboards 🌈♥"

	GayCount.find()
	.then(counts => {
		let top5 = counts.sort((a, b) => {
			let count1 = a.count
			let count2 = b.count

			if (count1 >= count2) return -1
			if (count1 < count2) return 1
		})
		channel.send(`** ${leaderboard_string} **\n｡☆✼★━━━━━━━━━★✼☆｡\n\n ${top5.map((user, index) => (`${index+1}. **${user.username}**: ${user.count}%\n`)).join('')}`)
	})

}

exports.printPersonalCount = (author, channel) => {
	let gay_phrases = [
		"Fabulous!!! 🌈",
		"Yasss QUEEEN! 😍😍😍",
		"Cummy cummy in my tummy!! 🍆👅💦💦💦 YUMMY YUMMY",
		"Anal Astronaut 🌈👨‍🚀",
		"Daddy's Cummies!! 😍😍😋😋😩😩😩"
	]

	let rand = gay_phrases[Math.floor(Math.random() * gay_phrases.length)];

	GayCount.findOne({"user_id": author})
	.then(user => {
		if (user !== null) {
			channel.send(`${user.username} is ${user.count}% gay!! ${rand}`)
		}

		else {
        	channel.send(`You aren't gay at all!! You gotta type gay to get a score.`)
        }
	})
	.catch(err => {
		console.log(err)
	})
}

niggerWatch = (channel) => {
	let nigger_phrases = [
		"3/5 Person",
		"Sub-human Filth",
		"Monkey Boi",
		"Ape",
		"Gorilla Man",
		"Darkie Boi",
		"Antique Farm Equipment",
		"Bootlip Bumbo",
		"Casabooboo",
		"Jigaboo",
	]

	let rand = nigger_phrases[Math.floor(Math.random() * nigger_phrases.length)];
	channel.send(`Excuse me, that term is very offensive. Please use a more appropriate term such as ${rand}. Thank you!`)

}


addNewGayCount = (user, username, callback) => {
	let newGayCount = new GayCount({
		username: username,
		user_id: user,
		count: 0
	})

	newGayCount.save()
	.then(newuser => {
		callback(newuser)
	})
	.catch(err => {
		console.log(err)
	})
}

incrementGayCount = (user, username, count) => {
	GayCount.findOne({"user_id": user})
	.then(gaycount => {
		if (gaycount === null) {
			addNewGayCount(user, username, newUser => {
				GayCount.findOne({"user_id": newUser.user_id})	
				.then(newgaycount => {
					newgaycount.count = newgaycount.count + count
					newgaycount.save()
					.then(savedgaycount => {
						console.log(`Updated ${newgaycount.username} gay count to ${savedgaycount.count}`)
					})
					.catch(err => {
						console.log(err)
					})
				})
				.catch(err => {
					console.log(err)
				})
			})	
		}
		else {
			gaycount.count = gaycount.count + count
			gaycount.save()
			.then(savedgaycount => {
				console.log(`Updated ${gaycount.username} gay count to ${savedgaycount.count}`)
			})
			.catch(err => {
				console.log(err)
			})
		}
	})
	.catch(err => {
		console.log(err)
	})
}
