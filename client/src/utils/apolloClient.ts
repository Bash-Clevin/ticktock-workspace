import {
  ApolloClient,
  ApolloLink,
  gql,
  InMemoryCache,
  NormalizedCacheObject,
  Observable,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

async function refreshToken(client: ApolloClient<NormalizedCacheObject>) {
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation RefreshToken {
          accessToken
        }
      `,
    });

    const newAccessToken = data?.refreshToken;
    if (!newAccessToken) {
      throw new Error('No access token received');
    }
    localStorage.setItem('accessToken', newAccessToken);
    return `Bearer ${newAccessToken}`;
  } catch (err) {
    throw new Error('Error getting a new access token');
  }
}

let retryCount = 0;
const maxRetry = 3;

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions!.code === 'UNAUTHENTICATED' && retryCount < maxRetry) {
        retryCount++;
        return new Observable((observer) => {
          refreshToken(client)
            .then((token) => {
              operation.setContext((previousContext: any) => ({
                headers: {
                  ...previousContext.headers,
                  authorization: token,
                },
              }));
              const forward$ = forward(operation);
              forward$.subscribe(observer);
            })
            .catch((error) => observer.error(error));
        });
      }
    }
  }
});

const uploadLink = createUploadLink({
  uri: import.meta.env.VITE_SERVER_URI || 'http://localhost:300/graphql',
  credentials: 'include',
  headers: {
    'apollo-require-preflight': 'true',
  },
});

export const client = new ApolloClient({
  uri: import.meta.env.VITE_SERVER_URI || 'http://localhost:300/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getCommentsByPostId: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  link: ApolloLink.from([errorLink, uploadLink]),
});
