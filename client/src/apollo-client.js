import React, { useMemo } from 'react'

import { endpoint } from './config/constants';

import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink } from '@apollo/client';

import { createUploadLink } from 'apollo-upload-client';

import { onError } from "@apollo/client/link/error";

import { setContext } from '@apollo/client/link/context';

import Cookies from 'universal-cookie';

const cookie = new Cookies()

export default function CustomApolloProvider(props) {

  const token = cookie.get("ut")

  const client = useMemo(() => {

    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        auth: token ? `ut ${token}` : null
      }
    }));

    const errorLink = onError(({ graphQLErrors, networkError, operation }) => {

      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, location, path }) => {
          console.log(`message:${message} path:${path}`)
        })
      }
    
      if (networkError) {
        console.log(`networkerror: ${networkError}`)
      }
    })

    const httpLink = createUploadLink({
      uri: endpoint,
    });

    const link = ApolloLink.from([errorLink, authLink, httpLink])
    
    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  }, [])

  return <ApolloProvider client={client} {...props} />;
}