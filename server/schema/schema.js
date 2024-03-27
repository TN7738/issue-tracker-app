const issues = require("../sampleData/sampleData");

const dateScalar = require("../scalars/date");

const Issue = require("../models/Issue");

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = require("graphql");

const IssueType = new GraphQLObjectType({
    name: "Issue",
    fields: () => ({
        id: { type: GraphQLID },
        status: { type: GraphQLString },
        owner: { type: GraphQLString },
        effort: { type: GraphQLInt },
        created: { type: dateScalar },
        due: { type: dateScalar },
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
                return Issue.findById(args.id);
            },
        },
        issues: {
            type: new GraphQLList(IssueType),
            resolve: (parent, args) => {
                return Issue.find();
            },
        },
    },
});

// Mutations
const mutations = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        // add a new issue to DB
        addIssue: {
            type: IssueType,
            args: {
                status: { type: GraphQLNonNull(GraphQLString) },
                owner: { type: GraphQLNonNull(GraphQLString) },
                effort: { type: GraphQLNonNull(GraphQLInt) },
                created: { type: GraphQLNonNull(dateScalar) },
                due: { type: dateScalar },
                title: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (parent, args) => {
                const issue = new Issue({
                    status: args.status,
                    owner: args.owner,
                    effort: args.effort,
                    created: args.created,
                    due: args.due,
                    title: args.title,
                });
                return issue.save();
            },
        },

        // delete an issue in DB
        deleteIssue: {
            type: IssueType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve: (parent, args) => {
                return Issue.findByIdAndDelete(args.id);
            },
        },

        // update an issue in DB
        updateIssue: {
            type: IssueType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                status: { type: GraphQLString },
                owner: { type: GraphQLString },
                effort: { type: GraphQLInt },
                created: { type: dateScalar },
                due: { type: dateScalar },
                title: { type: GraphQLString },
            },
            resolve: (parent, args) => {
                return Issue.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            status: args.status,
                            owner: args.owner,
                            effort: args.effort,
                            created: args.created,
                            due: args.due,
                            title: args.title,
                        },
                    },
                    { new: true }
                );
            },
        },

        // filter issues based on status and/or owwner
        filterIssues: {
            type: new GraphQLList(IssueType),
            args: {
                status: { type: GraphQLString },
                owner: { type: GraphQLString },
            },
            resolve: (parent, args) => {
                console.log(args);
                if (args.status !== "" && args.owner === "") {
                    return Issue.find({ status: args.status });
                } else if (args.status === "" && args.owner !== "") {
                    return Issue.find({ owner: args.owner });
                } else if (args.status !== "" && args.owner !== "") {
                    return Issue.find({
                        owner: args.owner,
                        status: args.status,
                    });
                } else {
                    return Issue.find();
                }
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutations,
});
