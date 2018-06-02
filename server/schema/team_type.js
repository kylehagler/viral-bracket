const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;
const Team = mongoose.model('team');

const TeamType = new GraphQLObjectType({
  name: 'TeamType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    position: { type: GraphQLString },
    bracket: {
      type: require('./bracket_type'),
      resolve(parentValue) {
        return Team.findById(parentValue)
          .populate('bracket')
          .then(team => {
            return team.bracket;
          });
      }
    }
  })
});

module.exports = TeamType;
