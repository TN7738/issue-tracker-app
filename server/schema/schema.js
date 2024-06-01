const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
} = require("graphql");
const issues = require("../../sampleData/sampleData");

const IssueType = new GraphQLObjectType({
    name: "Issue",
    fields: () => ({
        id: { type: GraphQLID },
        status: { type: GraphQLString },
        owner: { type: GraphQLString },
        effort: { type: GraphQLInt },
        title: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        issue: {
            type: IssueType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                return issues.find((issue) => issue.id === args.id);
            },
        },
        issues: {
            type: new GraphQLList(IssueType),
            resolve: (parent, args) => {
                return issues;
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
