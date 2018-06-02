const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList, GraphQLNonNull } = graphql;
const mongoose = require('mongoose');
const Bracket = mongoose.model('bracket');
const Team = mongoose.model('team');
const BracketType = require('./bracket_type');
const TeamType = require('./team_type');
const TeamInputType = require('./team_input_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addBracket: {
      type: BracketType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        size: { type: GraphQLInt }
      },
      resolve(parentValue, { title, description, size }) {
        return new Bracket({ title, description, size }).save();
      }
    },
    addTeamsToBracket: {
      type: BracketType,
      args: {
        bracketId: { type: new GraphQLNonNull(GraphQLID) },
        teams: { type: new GraphQLList(TeamInputType) }
      },
      resolve(parentValue, { bracketId, teams }) {
        return Bracket.addTeams(bracketId, teams);
      }
    },
    // likeLyric: {
    //   type: LyricType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parentValue, { id }) {
    //     return Lyric.like(id);
    //   }
    // },
    deleteBracket: {
      type: BracketType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Bracket.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;
