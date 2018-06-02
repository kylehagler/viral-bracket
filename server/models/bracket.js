const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BracketSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  size: { type: Number },
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: 'team'
    }
  ],
  created_at: { type: Date, required: true, default: Date.now }
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'user'
  // },
});

BracketSchema.statics.addTeam = function(id, title, position) {
  const Team = mongoose.model('team');

  return this.findById(id).then(bracket => {
    const team = new Team({ title, position, bracket });
    bracket.teams.push(team);
    return Promise.all([team.save(), bracket.save()]).then(([team, bracket]) => bracket);
  });
};

// BracketSchema.statics.addTeams = function(id, teams) {
//   const Team = mongoose.model('team');

//   return Team.insertMany(teams).then(teams => {
//     this.findByIdAndUpdate(id, { $push: { teams: { $each: teams } } }, { new: true });
//   });
// };

BracketSchema.statics.addTeams = function(id, teams) {
  const Team = mongoose.model('team');

  teams = teams.map(team => new Team(team));

  return Promise.all([
    this.findByIdAndUpdate(id, { $push: { teams: { $each: teams } } }, { new: true }),
    teams.map(team => team.save())
  ]).then(([bracket, teams]) => bracket);
};

BracketSchema.statics.findTeams = function(id) {
  return this.findById(id)
    .populate('teams')
    .then(bracket => bracket.teams);
};

mongoose.model('bracket', BracketSchema);
