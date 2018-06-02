const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
	bracket: {
		type: Schema.Types.ObjectId,
		ref: 'bracket'
	},
	title: { type: String, required: true },
	position: { type: String, required: true }
});

// LyricSchema.statics.like = function(id) {
//   const Lyric = mongoose.model('lyric');

//   return Lyric.findById(id).then(lyric => {
//     ++lyric.likes;
//     return lyric.save();
//   });
// };

mongoose.model('team', TeamSchema);
