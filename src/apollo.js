import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache({
    typePolicies: {
      RealMovie: {
        fields: {
          isLiked: {
            merge(existing, incoming) {
              if(existing) {
                return existing;
              } else {
                return incoming;
              }   
            }
          }
        }
      }
    }
  }),
  resolvers: {
    RealMovie: {
      isLiked: () => false
    },
    Mutation: {
      toggleLike: (_, { id, isLiked }, { cache }) => {
        const identifier = {
          __typename: 'RealMovie',
          id: `${id}`,
          isLiked: `${isLiked}`,
          };
        cache.modify({ 
          // id: `RealMovie:${id}`,
          // fields: {
          //   isLiked: true,
          //   medium_cover_image: 'a'
          // }
          id: cache.identify(identifier),
          fields: {
            isLiked: (a) => {
              console.log(a)
              return !a
            }
          }
        })
      },
    }
  }
})

export default client;