// https://www.apollographql.com/docs/tutorial/client/
//   current place in fullstack tutorial

// https://www.apollographql.com/docs/react/get-started/
//   brief detour

// -----------------------------------------------------------------------------

import { ApolloClient }  from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink }      from 'apollo-link-http';
import gql               from 'graphql-tag';

import React                        from 'react';
import { render }                   from 'react-dom';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';

// -----------------------------------------------------------------------------

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/'
});

const client = new ApolloClient({
  cache,
  link
});

// -----------------------------------------------------------------------------

const LAUNCHES_QUERY = gql`

{
  launches(pageSize: 3) {
    cursor
    hasMore
    launches {
      id
      site
      mission {
        name
        missionPatch
      }
      rocket {
        name
        type
      }
    }
  }
}

`

function Launches() {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error)   return <p>Error :(</p>;

  return <pre>{ JSON.stringify(data, null, 2) }</pre>;
}

// -----------------------------------------------------------------------------

const App = () => (
  <ApolloProvider client={client}>
    <Launches />
  </ApolloProvider>
);

render(<App />, document.getElementById('root'));
