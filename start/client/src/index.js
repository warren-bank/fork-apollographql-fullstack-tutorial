// https://www.apollographql.com/docs/tutorial/client/
//   current place in fullstack tutorial

import { ApolloClient }   from 'apollo-client';
import { InMemoryCache }  from 'apollo-cache-inmemory';
import { HttpLink }       from 'apollo-link-http';

import { ApolloProvider } from '@apollo/react-hooks';
import React              from 'react';
import ReactDOM           from 'react-dom';
import Pages              from './pages';

const token = localStorage.getItem('token');

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/',
  headers: {
    authorization: token ? token : ''
  }
});

cache.writeData({
  data: {
    isLoggedIn: !!token,
    cartItems: [],
  },
});

const client = new ApolloClient({
  cache,
  link
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>, document.getElementById('root')
);
