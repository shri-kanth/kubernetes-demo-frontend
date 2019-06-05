import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map} from 'rxjs/operators';

import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

import { List } from 'src/app/models/List';

const createListMutation = gql
`mutation createListMutation($name:String){
    list:createList(name:$name){
      id
      name
      position
    }
}`;

const deleteListMutation = gql
`mutation deleteListMutation($id:ID!){
  success:deleteList(id:$id)
}`;

@Injectable({
  providedIn: 'root'
})
export class ListMutationService {

  constructor(private apollo: Apollo) { }

  createList(listName:String):Observable<List> {
    return this.apollo.mutate({
        mutation: createListMutation,
        variables:{name:listName}
      }).pipe(map(result => {
        return result['data']['list'];
      }));
  }

  deleteList(list:List):Observable<boolean> {
    return this.apollo.mutate({
        mutation: deleteListMutation,
        variables:{id:list.id}
      }).pipe(map(result => result['success'])); 
    }
}
