const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const BracketType = require('./bracket_type');
const TeamType = require('./team_type');
const Team = mongoose.model('team');
const Bracket = mongoose.model('bracket');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    brackets: {
      type: new GraphQLList(BracketType),
      resolve() {
        return Bracket.find({});
      }
    },
    bracket: {
      type: BracketType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Bracket.findById(id);
      }
    },
    team: {
      type: TeamType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Team.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
