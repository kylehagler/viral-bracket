const graphql = require('graphql');
const { GraphQLInputObjectType, GraphQLID, GraphQLInt, GraphQLString } = graphql;

const TeamInputType = new GraphQLInputObjectType({
  name: 'TeamInputType',
  fields: () => ({
    title: { type: GraphQLString },
    position: { type: GraphQLString }
  })
});

module.exports = TeamInputType;
