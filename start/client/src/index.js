// https://www.apollographql.com/docs/tutorial/client/
//   current place in fullstack tutorial

import { ApolloClient }   from 'apollo-client';
import { InMemoryCache }  from 'apollo-cache-inmemory';
import { HttpLink }       from 'apollo-link-http';
import { setContext }     from 'apollo-link-context';
import gql                from 'graphql-tag';

import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import React                        from 'react';
import ReactDOM                     from 'react-dom';

import { resolvers, typeDefs }      from './resolvers';
import Pages                        from './pages';
import Login                        from './pages/login';
import injectStyles                 from './styles';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? token : ""
    }
  }
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    cartItems:  [],
  },
});

// -----------------------------------------------------------------------------

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Pages /> : <Login />;
}

// -----------------------------------------------------------------------------

injectStyles();

ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>, document.getElementById('root')
);
