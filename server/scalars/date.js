const { GraphQLScalarType, Kind } = require("graphql");

const dateToString = require("../utils/date-to-string");
const stringToDate = require("../utils/string-to-date");

const dateScalar = new GraphQLScalarType({
    name: "Date",
    description: "Date Scalar",
    serialize: (value) => {
        return dateToString(value);
    },
    parseValue: (value) => {
        return stringToDate(value);
    },
    parseLiteral: (ast) => {
        if (ast.kind === Kind.STRING) {
            return stringToDate(ast.value);
        }
        throw new Error("Invalid format");
    },
});

module.exports = dateScalar;
