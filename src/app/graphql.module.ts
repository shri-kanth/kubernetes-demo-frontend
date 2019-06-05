import {NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Apollo
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import { environment } from '../environments/environment';

const uri = environment.SERVER_URI; // Back-End GraphQL EndPoint

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    // create Apollo
    apollo.create({
      link: httpLink.create({ uri }),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'network-only', // disabling cache for fetch
          errorPolicy: 'ignore',
        },
      },
    });
  }
}
