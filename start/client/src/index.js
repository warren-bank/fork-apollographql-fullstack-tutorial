// https://www.apollographql.com/docs/tutorial/client/
//   current place in fullstack tutorial

import { ApolloClient }   from 'apollo-client';
import { InMemoryCache }  from 'apollo-cache-inmemory';
import { HttpLink }       from 'apollo-link-http';
import gql                from 'graphql-tag';

import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import React                        from 'react';
import ReactDOM                     from 'react-dom';

import { resolvers, typeDefs }      from './resolvers';
import Pages                        from './pages';
import Login                        from './pages/login';
import injectStyles                 from './styles';

const token = localStorage.getItem('token');

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/',
  headers: {
    authorization: token ? token : ''
  }
});

const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers
});

cache.writeData({
  data: {
    isLoggedIn: !!token,
    cartItems: [],
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
