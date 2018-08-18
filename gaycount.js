const mongoose 	= require('mongoose')
const Schema 	= mongoose.Schema

const gayCountSchema = Schema({
	user_id: {
		unique: true,
		type: String,
	},
	username: {
		type: String,
	},
	count: {
		default: 0,
		type: Number,
	},
})

const GayCountClass = mongoose.model('GayCount', gayCountSchema)

module.exports = GayCountClass