// https://www.apollographql.com/docs/tutorial/client/
//   current place in fullstack tutorial

// https://www.apollographql.com/docs/react/get-started/
//   brief detour
// https://github.com/apollographql/apollo-client/blob/master/packages/apollo-boost/src/index.ts
//   'apollo-boost' module imports modules and exports them in a reorganized collection
// https://github.com/apollographql/apollo-client/blob/%40apollo/client%403.0.0-beta.14/src/ApolloClient.ts#L142
//   this documentation is out of date
//   - calling constructor with "uri" throw an Exception:
//       new ApolloClient({ uri: 'http://localhost:4000/' })

import { ApolloClient }  from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink }      from 'apollo-link-http';
import gql               from 'graphql-tag';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/'
});

const client = new ApolloClient({
  cache,
  link
});

client
.query({
  query: gql`

query GetLaunches {
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
})
.then(result => {
  document.querySelector('#root').innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
});
