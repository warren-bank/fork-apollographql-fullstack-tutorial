const { gql } = require('apollo-server');

// https://www.apollographql.com/docs/resources/graphql-glossary/#docstring
//   Docstrings show up in the documentation panel

const typeDefs = gql`

    type Query {
      launches(
        """
        The number of results to show. Must be >= 1. Default = 20
        """
        pageSize: Int

        """
        If you add a cursor here, it will only return results _after_ this cursor
        """
        after: String
      ): LaunchConnection!

      launch(id: ID!): Launch
      me: User

      # testing:
      sameContext: Boolean!
    }

    """
    Simple wrapper around our list of launches that contains a cursor to the
    last item in the list. Pass this cursor to the launches query to fetch results
    after these.
    """
    type LaunchConnection {
      cursor: String!
      hasMore: Boolean!
      launches: [Launch]!
    }

    type User {
      id: ID!
      email: String!
      trips: [Launch]!
    }

    type Launch {
      id: ID!
      site: String
      mission: Mission
      rocket: Rocket
      isBooked: Boolean!
    }

    type Mission {
      name: String
      missionPatch(size: PatchSize): String
    }

    type Rocket {
      id: ID!
      name: String
      type: String
    }

    enum PatchSize {
      SMALL
      LARGE
    }

    type Mutation {
      # if false, booking trips failed -- check errors
      bookTrips(launchIds: [ID]!): TripUpdateResponse!

      # if false, cancellation failed -- check errors
      cancelTrip(launchId: ID!): TripUpdateResponse!

      login(email: String): String # login token
    }

    type TripUpdateResponse {
      success: Boolean!
      message: String
      launches: [Launch]
    }

`;

module.exports = typeDefs;
