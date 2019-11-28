const { gql } = require('apollo-server');

const typeDefs = gql`

    type Query {
      launches: [Launch]!
      launch(id: ID!): Launch
      me: User

      # testing:
      sameContext: Boolean!
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
