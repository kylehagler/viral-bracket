const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList } = graphql;
const TeamType = require('./team_type');
const Bracket = mongoose.model('bracket');

const BracketType = new GraphQLObjectType({
  name: 'BracketType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    size: { type: GraphQLInt },
    created_at: { type: GraphQLString },
    teams: {
      type: new GraphQLList(TeamType),
      resolve(parentValue) {
        return Bracket.findTeams(parentValue.id);
      }
    }
  })
});

module.exports = BracketType;
