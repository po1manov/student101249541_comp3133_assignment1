const queryResolvers = require('./Query');
const mutationResolvers = require('./Mutation');

const resolvers = {
    Query: queryResolvers,
    Mutation: mutationResolvers,
    // If you have any custom types that need specific resolvers for their fields, they would be included here.
    // For example:
    // Employee: {
    //   fullName: (parent) => `${parent.firstName} ${parent.lastName}`,
    // },
};

module.exports = resolvers;
