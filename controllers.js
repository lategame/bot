const GayCount = require('./gaycount')

exports.handleMessage = (message) => {
	let { author, content } = message
	let count = (content.match(/gay/gi) || []).length;

	if (count > 0 && author.id !== "480387811065987112" && message.content !=="!imgay") {
		incrementGayCount(author.id, author.username, count)
	}

}

exports.countHistory = (channel) => {
	channel.fetchMessages({limit: 100})
	.then(messages => {
		messages.forEach(message => {
			let { author, content } = message
			let count = (content.match(/gay/g) || []).length;

			if (count > 0) {
				let obj = userarray.find(item => {
					return item.user_id === author.id
				})
				if (obj === undefined) {
					userarray.push({
						user_id: author.id,
						username: author.username,
						count: count
					})
				}
				else {
					obj.count = obj.count + count
				}
			}

		})
		console.log(userarray)
	})
	.catch(err => {
		console.log(err)
	})
}

exports.printCount = (channel) => {

	GayCount.find()
	.then(counts => {
		let top5 = counts.sort((a, b) => {
			let count1 = a.count
			let count2 = b.count

			if (count1 >= count2) return -1
			if (count1 < count2) return 1
		})

		channel.send('Gay Leaderboards: \n' + top5.map(user => (user.username + ': ' + user.count + '\n')).join(''))
	})
}

exports.printPersonalCount = (author, channel) => {
	GayCount.findOne({"user_id": author})
	.then(user => {
		if (user !== null) {
			channel.send(`Gay count for ${user.username} is ${user.count}`)
		}
	})
	.catch(err => {
		console.log(err)
	})
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
